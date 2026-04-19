"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizeService = void 0;
const common_1 = require("@nestjs/common");
const grok_service_1 = require("./grok.service");
const parser_service_1 = require("./parser.service");
const prompt_service_1 = require("./prompt.service");
const validation_service_1 = require("./validation.service");
let OptimizeService = class OptimizeService {
    groqService;
    parserService;
    promptService;
    validationService;
    constructor(groqService, parserService, promptService, validationService) {
        this.groqService = groqService;
        this.parserService = parserService;
        this.promptService = promptService;
        this.validationService = validationService;
    }
    async optimize(code) {
        const metadata = this.parserService.parse(code);
        const prompt = this.promptService.buildOptimizePrompt(code);
        const raw = await this.groqService.getRawResponse(prompt);
        const result = this.validationService.parseAndValidate(raw);
        return { ...result, metadata };
    }
};
exports.OptimizeService = OptimizeService;
exports.OptimizeService = OptimizeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [grok_service_1.GroqService,
        parser_service_1.ParserService,
        prompt_service_1.PromptService,
        validation_service_1.ValidationService])
], OptimizeService);
//# sourceMappingURL=optimize.service.js.map