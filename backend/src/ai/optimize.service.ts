import { Injectable } from '@nestjs/common';
import { GroqService } from './grok.service';

@Injectable()
export class OptimizeService {
  constructor(private readonly groqService: GroqService) {}

  async optimizeCode(code: string) {
    return this.groqService.optimize(code);
  }
}
