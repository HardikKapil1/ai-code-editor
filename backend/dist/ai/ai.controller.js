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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const optimize_service_1 = require("./optimize.service");
const explain_service_1 = require("./explain.service");
const memory_service_1 = require("./memory.service");
let AiController = class AiController {
    optimizeService;
    explainService;
    memoryService;
    constructor(optimizeService, explainService, memoryService) {
        this.optimizeService = optimizeService;
        this.explainService = explainService;
        this.memoryService = memoryService;
    }
    async optimize(body) {
        return this.optimizeService.optimize(body.code);
    }
    async explain(body) {
        return this.explainService.explain(body.files);
    }
    async addMemory(body) {
        return this.memoryService.addMemory(body.code, body.reason, body.fileName);
    }
    async getMemories() {
        return this.memoryService.getMemories();
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('optimize'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "optimize", null);
__decorate([
    (0, common_1.Post)('explain'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "explain", null);
__decorate([
    (0, common_1.Post)('memory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "addMemory", null);
__decorate([
    (0, common_1.Get)('memory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getMemories", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [optimize_service_1.OptimizeService,
        explain_service_1.ExplainService,
        memory_service_1.MemoryService])
], AiController);
//# sourceMappingURL=ai.controller.js.map