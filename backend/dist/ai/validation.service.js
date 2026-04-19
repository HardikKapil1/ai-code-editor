"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
let ValidationService = class ValidationService {
    parseAndValidate(raw) {
        try {
            const cleaned = raw
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            const parsed = JSON.parse(cleaned);
            if (!parsed.optimizedCode || !parsed.summary || !parsed.changes) {
                throw new Error('Missing required fields in AI response');
            }
            return parsed;
        }
        catch {
            throw new Error('AI returned invalid JSON: ' + raw);
        }
    }
    parseAndValidateExplain(raw) {
        try {
            const cleaned = raw
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            const parsed = JSON.parse(cleaned);
            if (!parsed.summary || !parsed.files || !parsed.dependencies) {
                throw new Error('Missing required fields in explain response');
            }
            return parsed;
        }
        catch {
            throw new Error('AI returned invalid JSON: ' + raw);
        }
    }
    parseAndValidateMemory(raw) {
        try {
            const cleaned = raw
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            const parsed = JSON.parse(cleaned);
            if (!parsed.fileName || !parsed.category || !parsed.summary) {
                throw new Error('Missing required fields in memory response');
            }
            return parsed;
        }
        catch {
            throw new Error('AI returned invalid JSON: ' + raw);
        }
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map