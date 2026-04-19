import { Injectable } from '@nestjs/common';

@Injectable()
export class ParserService {
  parse(code: string) {
    return {
      lineCount: code.split('\n').length,
      hasAsync: code.includes('async'),
      hasClasses: code.includes('class '),
      language: this.detectLanguage(code),
    };
  }

  private detectLanguage(code: string): string {
    if (code.includes('import React')) return 'react';
    if (code.includes('def ') || code.includes('print(')) return 'python';
    if (code.includes('interface ') || code.includes(': string')) return 'typescript';
    return 'javascript';
  }
}