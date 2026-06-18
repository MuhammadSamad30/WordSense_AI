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
    const prompt = `Act as an advanced, premium English-to-Urdu dictionary. Provide a comprehensive definition for the word "${word}".
    Ensure the Urdu translation is highly accurate and natural.
    
    Provide the following fields:
    1. word: The searched word.
    2. meaning: Exact Urdu meaning.
    3. phonetic: IPA phonetic spelling (e.g., /tɒl.ər.əns/).
    4. partOfSpeech: The part of speech (Noun, Verb, Adjective, etc.).
    5. definition: A clear, easy-to-understand English definition.
    6. example_en: A one-line English example sentence.
    7. example_ur: A one-line natural Urdu translation of that example sentence.
    8. synonyms: An array of up to 4 synonyms.
    9. antonyms: An array of up to 4 antonyms.
    
    Respond STRICTLY in JSON format matching this schema:
    {
      "word": "${word}",
      "meaning": "Urdu meaning",
      "phonetic": "phonetic spelling",
      "partOfSpeech": "part of speech",
      "definition": "English definition",
      "example_en": "English example",
      "example_ur": "Urdu translation",
      "synonyms": ["synonym1", "synonym2"],
      "antonyms": ["antonym1", "antonym2"]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
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
