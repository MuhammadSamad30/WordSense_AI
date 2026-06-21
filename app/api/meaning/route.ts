import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import globalCache from '@/lib/cache';
import globalRateLimiter from '@/lib/rateLimiter';
import logger from '@/lib/logger';
import { SearchResult, WordEntry } from '@/types';
import wordsData from '@/data/words.json';

// Zod validation schema for query parameters
const querySchema = z.object({
  word: z.string()
    .min(1, 'Word parameter cannot be empty')
    .max(50, 'Word parameter is too long')
    .regex(/^[a-zA-Z\s-]+$/, 'Word parameter must contain only English letters, spaces, or hyphens'),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wordParam = searchParams.get('word');

  // 1. Get client IP for rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             '127.0.0.1';

  // 2. Apply rate limiter (10 requests per minute per IP)
  const rateLimitResult = globalRateLimiter.check(ip);
  if (!rateLimitResult.allowed) {
    logger.warn('Rate limit exceeded', { ip, word: wordParam });
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
        }
      }
    );
  }

  // 3. Validate query input
  const validation = querySchema.safeParse({ word: wordParam });
  if (!validation.success) {
    const errorMessage = validation.error.issues[0].message;
    logger.warn('Invalid request payload', { ip, word: wordParam, error: errorMessage });
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  const word = validation.data.word.trim().toLowerCase();

  // 4. Check if the word is in the built-in words list
  const localMatch = (wordsData as WordEntry[]).find(
    (item) => item.word.toLowerCase() === word
  );

  if (localMatch) {
    logger.info('Built-in dictionary hit', { ip, word });
    return NextResponse.json({
      word: localMatch.word, // Preserve original casing or matching word
      meaning: localMatch.meaning,
      example_en: localMatch.example_en,
      example_ur: localMatch.example_ur,
      isAiGenerated: false,
    });
  }

  // 5. Check LRU cache (Map with 24-hour expiry)
  const cachedResult = globalCache.get(word);
  if (cachedResult) {
    logger.info('Cache hit', { ip, word });
    return NextResponse.json({ ...cachedResult, isAiGenerated: true });
  }

  // 5. Check if OpenAI API Key is configured
  if (!process.env.OPENAI_API_KEY) {
    logger.error('OpenAI API Key is not configured in environment variables');
    return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
  }

  logger.info('Cache miss - calling OpenAI API', { ip, word });

  try {
    const systemPrompt = `You are an expert English-to-Urdu dictionary translator. 
Provide the Urdu translation and an example sentence for the English word.
You must output STRICTLY a JSON object with the following keys:
{
  "meaning": "The Urdu translation of the word using beautiful, natural, and standard Urdu characters (e.g., matching the dictionary translation). Do not include parenthetical transliterations or definitions, just the translation.",
  "example_en": "An easy-to-understand, natural English sentence using the word.",
  "example_ur": "The translation of the example sentence into Urdu."
}`;

    const userPrompt = `Translate the English word: "${word}"`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 150,
    });

    const choiceContent = response.choices[0]?.message?.content;
    if (!choiceContent) {
      throw new Error('No content returned from OpenAI Chat Completion');
    }

    const data = JSON.parse(choiceContent);

    // Validate the response structure from OpenAI
    if (!data.meaning || !data.example_en || !data.example_ur) {
      throw new Error('OpenAI response does not contain all required fields');
    }

    const finalResult: SearchResult = {
      word: wordParam!, // Keep original casing of searched word
      meaning: data.meaning,
      example_en: data.example_en,
      example_ur: data.example_ur,
      isAiGenerated: true,
    };

    // 6. Save in LRU cache
    globalCache.set(word, finalResult);
    logger.info('OpenAI call succeeded and cached', { word });

    return NextResponse.json(finalResult);
  } catch (error) {
    logger.error('Failed to retrieve meaning from OpenAI', error, { ip, word });
    return NextResponse.json(
      { error: 'Failed to retrieve Urdu translation. Please try again later.' },
      { status: 500 }
    );
  }
}
