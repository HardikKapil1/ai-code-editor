export declare class PromptService {
    buildOptimizePrompt(code: string): string;
    buildExplainPrompt(files: Record<string, string>): string;
    buildMemoryPrompt(code: string, reason: string, fileName: string): string;
}
