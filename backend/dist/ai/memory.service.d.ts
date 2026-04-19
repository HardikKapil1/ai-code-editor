import { GroqService } from './grok.service';
import { PromptService } from './prompt.service';
import { ValidationService } from './validation.service';
export declare class MemoryService {
    private readonly groqService;
    private readonly promptService;
    private readonly validationService;
    private memories;
    constructor(groqService: GroqService, promptService: PromptService, validationService: ValidationService);
    addMemory(code: string, reason: string, fileName: string): Promise<any>;
    getMemories(): any[];
}
