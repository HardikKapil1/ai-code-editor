import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {
    
/**
 * Builds a prompt for optimizing code.
 * @param code 
 * @returns 
 */

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

'IMPORTANT: In JSON string values, use \\n instead of real newlines.'
Code to optimize:
${code}`;
    }

    /**
     * Builds a prompt for explaining the codebase structure.
     * @param files 
     * @returns 
     */

    buildExplainPrompt(files: Record<string, string>): string {
        const fileContents = Object.entries(files)
            .map(([name, content]) => `### ${name}\n${content}`)
            .join('\n\n');

        return `You are a senior software architect.
Analyze the following codebase and explain its structure.
Return ONLY a valid JSON object. No markdown, no backticks, no explanation.
IMPORTANT: In JSON string values, use \\n instead of real newlines.

Use exactly this structure:
{
  "summary": "...",
  "entryPoint": "...",
  "files": [
    {
      "name": "...",
      "purpose": "...",
      "imports": ["..."],
      "exports": ["..."]
    }
  ],
  "dependencies": [
    {
      "from": "...",
      "to": "...",
      "type": "imports"
    }
  ]
}

Codebase:
${fileContents}`;
    }
}