import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { OptimizeService } from './optimize.service';
import { GroqService } from './grok.service';
import { ParserService } from './parser.service';
import { PromptService } from './prompt.service';
import { ValidationService } from './validation.service';
import { ExplainService } from './explain.service';
import { MemoryService } from './memory.service';

@Module({
  controllers: [AiController],
  providers: [
    OptimizeService,
    GroqService,
    ParserService,
    PromptService,
    ValidationService,
    ExplainService,
    MemoryService,
  ],
})
export class AiModule {}
