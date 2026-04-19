export declare class GroqService {
    private client;
    getRawResponse(prompt: string): Promise<string>;
    optimize(code: string): Promise<any>;
}
