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
exports.SectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const section_entity_1 = require("./section.entity");
let SectionsService = class SectionsService {
    sectionsRepository;
    constructor(sectionsRepository) {
        this.sectionsRepository = sectionsRepository;
    }
    async findAll() {
        return this.sectionsRepository.find({
            relations: ['teacher']
        });
    }
    async findOneWithStudents(id, schoolYear) {
        const query = this.sectionsRepository.createQueryBuilder('section')
            .leftJoinAndSelect('section.enrollments', 'enrollment', schoolYear ? 'enrollment.schoolYear = :schoolYear' : '1=1', { schoolYear })
            .leftJoinAndSelect('enrollment.student', 'student')
            .where('section.id = :id', { id });
        const section = await query.getOne();
        return section;
    }
};
exports.SectionsService = SectionsService;
exports.SectionsService = SectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SectionsService);
//# sourceMappingURL=sections.service.js.map