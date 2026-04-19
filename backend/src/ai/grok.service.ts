import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class GroqService {
  private client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY!,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  async getRawResponse(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return response.choices[0].message.content ?? '';
  }

  async optimize(code: string) {
    const response = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a senior software engineer.
Analyze and optimize the given code.
Return ONLY a valid JSON object. No markdown, no explanation, no backticks.
Use exactly this structure:
{
  "optimizedCode": "...",
  "summary": "...",
  "changes": [
    {
      "type": "performance | readability | refactor",
      "title": "...",
      "description": "...",
      "before": "...",
      "after": "..."
    }
  ]
}`,
        },
        {
          role: 'user',
          content: code,
        },
      ],
      temperature: 0.3,
    });

    const raw = response.choices[0].message.content ?? '';

    try {
      return JSON.parse(raw);
    } catch {
      throw new Error('AI returned invalid JSON: ' + raw);
    }
  }
}
