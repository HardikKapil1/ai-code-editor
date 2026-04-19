import { Body, Controller, Post } from '@nestjs/common';
import { OptimizeService } from './optimize.service';

@Controller('ai')
export class AiController {
  constructor(private readonly optimizeService: OptimizeService) {}

  @Post('optimize')
  async optimize(@Body() body: any) {
    return this.optimizeService.optimizeCode(body.code);
  }
}
