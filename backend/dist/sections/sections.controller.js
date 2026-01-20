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
exports.SectionsController = void 0;
const common_1 = require("@nestjs/common");
const sections_service_1 = require("./sections.service");
let SectionsController = class SectionsController {
    sectionsService;
    constructor(sectionsService) {
        this.sectionsService = sectionsService;
    }
    findAll() {
        return this.sectionsService.findAll();
    }
    findOne(id, schoolYear) {
        return this.sectionsService.findOneWithStudents(+id, schoolYear);
    }
};
exports.SectionsController = SectionsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/students'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('schoolYear')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SectionsController.prototype, "findOne", null);
exports.SectionsController = SectionsController = __decorate([
    (0, common_1.Controller)('sections'),
    __metadata("design:paramtypes", [sections_service_1.SectionsService])
], SectionsController);
//# sourceMappingURL=sections.controller.js.map