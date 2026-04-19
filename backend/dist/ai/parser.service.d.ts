export declare class ParserService {
    parse(code: string): {
        lineCount: number;
        hasAsync: boolean;
        hasClasses: boolean;
        language: string;
    };
    private detectLanguage;
}
