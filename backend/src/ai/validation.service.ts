import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  parseAndValidate(raw: string) {
    try {
      const parsed = JSON.parse(raw);
      if (!parsed.optimizedCode || !parsed.summary || !parsed.changes) {
        throw new Error('Missing required fields in AI response');
      }
      return parsed;
    } catch {
      throw new Error('AI returned invalid JSON: ' + raw);
    }
  }
}