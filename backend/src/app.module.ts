import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OptimizeService } from './ai/optimize.service';
import { AiController } from './ai/ai.controller';
import { GroqService } from './ai/grok.service';

@Module({
  imports: [],
  controllers: [AppController, AiController],
  providers: [AppService, OptimizeService, GroqService],
})
export class AppModule {}
