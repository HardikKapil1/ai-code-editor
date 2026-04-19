"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const ai_controller_1 = require("./ai.controller");
const optimize_service_1 = require("./optimize.service");
const grok_service_1 = require("./grok.service");
const parser_service_1 = require("./parser.service");
const prompt_service_1 = require("./prompt.service");
const validation_service_1 = require("./validation.service");
const explain_service_1 = require("./explain.service");
const memory_service_1 = require("./memory.service");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        controllers: [ai_controller_1.AiController],
        providers: [
            optimize_service_1.OptimizeService,
            grok_service_1.GroqService,
            parser_service_1.ParserService,
            prompt_service_1.PromptService,
            validation_service_1.ValidationService,
            explain_service_1.ExplainService,
            memory_service_1.MemoryService,
        ],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map