// src/ai/ai.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { OptimizeService } from './optimize.service';
import { ExplainService } from './explain.service';
import { MemoryService } from './memory.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly optimizeService: OptimizeService,
    private readonly explainService: ExplainService,
    private readonly memoryService: MemoryService,
  ) {}

  @Post('optimize')
  async optimize(@Body() body: any) {
    return this.optimizeService.optimize(body.code);
  }
  @Post('explain')
  async explain(@Body() body: { files: Record<string, string> }) {
    return this.explainService.explain(body.files);
  }

  @Post('memory')
  async addMemory(
    @Body() body: { code: string; reason: string; fileName: string },
  ) {
    return this.memoryService.addMemory(body.code, body.reason, body.fileName);
  }

  @Get('memory')
  async getMemories() {
    return this.memoryService.getMemories();
  }
}
