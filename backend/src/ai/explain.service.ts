import { Injectable } from '@nestjs/common';
import { GroqService } from './grok.service';
import { PromptService } from './prompt.service';
import { ValidationService } from './validation.service';

@Injectable()
export class ExplainService {
  constructor(
    private readonly groqService: GroqService,
    private readonly promptService: PromptService,
    private readonly validationService: ValidationService,
  ) {}

  async explain(files: Record<string, string>) {
    const prompt = this.promptService.buildExplainPrompt(files);
    const raw = await this.groqService.getRawResponse(prompt);
    return this.validationService.parseAndValidateExplain(raw);
  }
}