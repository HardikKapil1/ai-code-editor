"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptService = void 0;
const common_1 = require("@nestjs/common");
let PromptService = class PromptService {
    buildOptimizePrompt(code) {
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
    buildExplainPrompt(files) {
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
    buildMemoryPrompt(code, reason, fileName) {
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
};
exports.PromptService = PromptService;
exports.PromptService = PromptService = __decorate([
    (0, common_1.Injectable)()
], PromptService);
//# sourceMappingURL=prompt.service.js.map