import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {
  buildOptimizePrompt(code: string): string {
    return `You are a senior software engineer.
Analyze and optimize the given code without changing its behavior.
Return ONLY a valid JSON object. No markdown, no backticks, no explanation.

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
}

Code to optimize:
${code}`;
  }
}