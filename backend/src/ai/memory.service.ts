import { Injectable } from '@nestjs/common';
import { GroqService } from './grok.service';
import { PromptService } from './prompt.service';
import { ValidationService } from './validation.service';

@Injectable()
export class MemoryService {
  private memories: any[] = [];

  constructor(
    private readonly groqService: GroqService,
    private readonly promptService: PromptService,
    private readonly validationService: ValidationService,
  ) {}

  async addMemory(code: string, reason: string, fileName: string) {
    const prompt = this.promptService.buildMemoryPrompt(code, reason, fileName);
    const raw = await this.groqService.getRawResponse(prompt);
    const result = this.validationService.parseAndValidateMemory(raw);
    this.memories.push({ ...result, timestamp: new Date() });
    return result;
  }

  getMemories() {
    return this.memories;
  }
}
