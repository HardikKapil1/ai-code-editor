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
exports.MemoryService = void 0;
const common_1 = require("@nestjs/common");
const grok_service_1 = require("./grok.service");
const prompt_service_1 = require("./prompt.service");
const validation_service_1 = require("./validation.service");
let MemoryService = class MemoryService {
    groqService;
    promptService;
    validationService;
    memories = [];
    constructor(groqService, promptService, validationService) {
        this.groqService = groqService;
        this.promptService = promptService;
        this.validationService = validationService;
    }
    async addMemory(code, reason, fileName) {
        const prompt = this.promptService.buildMemoryPrompt(code, reason, fileName);
        const raw = await this.groqService.getRawResponse(prompt);
        const result = this.validationService.parseAndValidateMemory(raw);
        this.memories.push({ ...result, timestamp: new Date() });
        return result;
    }
    getMemories() {
        return this.memories;
    }
};
exports.MemoryService = MemoryService;
exports.MemoryService = MemoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [grok_service_1.GroqService,
        prompt_service_1.PromptService,
        validation_service_1.ValidationService])
], MemoryService);
//# sourceMappingURL=memory.service.js.map