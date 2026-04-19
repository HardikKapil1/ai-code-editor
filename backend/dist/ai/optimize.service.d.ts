import { GroqService } from './grok.service';
import { ParserService } from './parser.service';
import { PromptService } from './prompt.service';
import { ValidationService } from './validation.service';
export declare class OptimizeService {
    private readonly groqService;
    private readonly parserService;
    private readonly promptService;
    private readonly validationService;
    constructor(groqService: GroqService, parserService: ParserService, promptService: PromptService, validationService: ValidationService);
    optimize(code: string): Promise<any>;
}
