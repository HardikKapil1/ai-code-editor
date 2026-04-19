// src/ai/ai.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { OptimizeService } from './optimize.service';
import { ExplainService } from './explain.service';

@Controller('ai')
export class AiController {
    constructor(private readonly optimizeService: OptimizeService
        , private readonly explainService: ExplainService
    ) { }

    @Post('optimize')
    async optimize(@Body() body: any) {
        return this.optimizeService.optimize(body.code);
    }
    @Post('explain')
    async explain(@Body() body: { files: Record<string, string> }) {
        return this.explainService.explain(body.files);
    }
}
