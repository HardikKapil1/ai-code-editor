import { Injectable } from '@nestjs/common';
import { GroqService } from './grok.service';
import { ParserService } from './parser.service';
import { PromptService } from './prompt.service';
import { ValidationService } from './validation.service';

@Injectable()
export class OptimizeService {
  constructor(
    private readonly groqService: GroqService,
    private readonly parserService: ParserService,
    private readonly promptService: PromptService,
    private readonly validationService: ValidationService,
  ) {}

  async optimize(code: string) {
    // Step 1 - Parse
    const metadata = this.parserService.parse(code);

    // Step 2 - Build prompt
    const prompt = this.promptService.buildOptimizePrompt(code);

    // Step 3 - Call AI
    const raw = await this.groqService.getRawResponse(prompt);

    // Step 4 - Validate
    const result = this.validationService.parseAndValidate(raw);

    return { ...result, metadata };
  }
}