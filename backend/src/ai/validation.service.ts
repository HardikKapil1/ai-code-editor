import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  parseAndValidate(raw: string) {
    try {
      // Remove markdown backticks if AI added them
      const cleaned = raw
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      if (!parsed.optimizedCode || !parsed.summary || !parsed.changes) {
        throw new Error('Missing required fields in AI response');
      }

      return parsed;
    } catch {
      throw new Error('AI returned invalid JSON: ' + raw);
    }
  }

  /**
   * Parses and validates the AI response for code explanation.
   * @param raw
   * @returns
   */

  parseAndValidateExplain(raw: string) {
    try {
      const cleaned = raw
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      if (!parsed.summary || !parsed.files || !parsed.dependencies) {
        throw new Error('Missing required fields in explain response');
      }

      return parsed;
    } catch {
      throw new Error('AI returned invalid JSON: ' + raw);
    }
  }

  /**
   * Parses and validates the AI response for memory storage.
   * @param raw
   * @returns
   */

  parseAndValidateMemory(raw: string) {
    try {
      const cleaned = raw
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      const parsed = JSON.parse(cleaned);
      if (!parsed.fileName || !parsed.category || !parsed.summary) {
        throw new Error('Missing required fields in memory response');
      }
      return parsed;
    } catch {
      throw new Error('AI returned invalid JSON: ' + raw);
    }
  }
}
