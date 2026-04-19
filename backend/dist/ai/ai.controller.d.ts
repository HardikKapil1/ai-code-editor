import { OptimizeService } from './optimize.service';
import { ExplainService } from './explain.service';
import { MemoryService } from './memory.service';
export declare class AiController {
    private readonly optimizeService;
    private readonly explainService;
    private readonly memoryService;
    constructor(optimizeService: OptimizeService, explainService: ExplainService, memoryService: MemoryService);
    optimize(body: any): Promise<any>;
    explain(body: {
        files: Record<string, string>;
    }): Promise<any>;
    addMemory(body: {
        code: string;
        reason: string;
        fileName: string;
    }): Promise<any>;
    getMemories(): Promise<any[]>;
}
