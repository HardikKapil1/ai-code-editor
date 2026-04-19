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

  /**
   * Builds a prompt for tracking code changes and categorizing them.
   * @param code
   * @param reason
   * @param fileName
   * @returns
   */

  buildMemoryPrompt(code: string, reason: string, fileName: string): string {
    return `You are a senior software engineer tracking code decisions.
Analyze this code change and categorize it.
Return ONLY valid JSON. No markdown, no backticks.
IMPORTANT: Use \\n instead of real newlines in string values.

{
  "fileName": "...",
  "category": "performance | bug-fix | readability | refactor",
  "summary": "...",
  "reason": "..."
}

File: ${fileName}
Reason given: ${reason}
Code: ${code}`;
  }
}
