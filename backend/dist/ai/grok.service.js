"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroqService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
let GroqService = class GroqService {
    client = new openai_1.default({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
    });
    async getRawResponse(prompt) {
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
    async optimize(code) {
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
        }
        catch {
            throw new Error('AI returned invalid JSON: ' + raw);
        }
    }
};
exports.GroqService = GroqService;
exports.GroqService = GroqService = __decorate([
    (0, common_1.Injectable)()
], GroqService);
//# sourceMappingURL=grok.service.js.map