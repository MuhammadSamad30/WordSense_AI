import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');

  if (!word) {
    return NextResponse.json({ error: 'Word is required' }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 });
  }

  try {
    const prompt = `Act as a premium English-to-Urdu dictionary. Provide the following for the word "${word}":
    1. Urdu meaning
    2. One-line English example sentence
    3. One-line Urdu translation of that example sentence.
    
    Respond STRICTLY in JSON format with the following keys:
    {
      "word": "${word}",
      "meaning": "Urdu meaning here",
      "example_en": "English example here",
      "example_ur": "Urdu translation here"
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    const result = JSON.parse(content);
    return NextResponse.json({ ...result, isAiGenerated: true });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch meaning from AI' }, { status: 500 });
  }
}
