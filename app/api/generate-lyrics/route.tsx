import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request, res: Response) {
  if (req.method === 'POST') {
    const { prompt } = await req.json();
    const { theme, mood, artistStyle } = JSON.parse(prompt);

    try {
      const result = await streamText({
        model: openai("gpt-4-1106-preview"),
        messages: [
          {
            role: "system",
            content: `CONTEXT: You are a lyrics generator. Generate lyrics based on the following criteria:
              - Theme: ${theme}
              - Mood: ${mood}
              - Artist Style: ${artistStyle}`
          }
        ],
        temperature: 0.7,
      });

      console.log({ result });

      return result.toDataStreamResponse();

    } catch (error) {
      console.error({ error });
      return new Response('Failed to generate lyrics', { status: 500 });
    }
  }

  else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}
