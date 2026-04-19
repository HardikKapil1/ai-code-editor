import { GroqService } from './grok.service';
import { PromptService } from './prompt.service';
import { ValidationService } from './validation.service';
export declare class ExplainService {
    private readonly groqService;
    private readonly promptService;
    private readonly validationService;
    constructor(groqService: GroqService, promptService: PromptService, validationService: ValidationService);
    explain(files: Record<string, string>): Promise<any>;
}
