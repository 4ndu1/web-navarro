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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teacher_entity_1 = require("./teacher.entity");
const section_entity_1 = require("../sections/section.entity");
let TeachersService = class TeachersService {
    teachersRepository;
    sectionsRepository;
    constructor(teachersRepository, sectionsRepository) {
        this.teachersRepository = teachersRepository;
        this.sectionsRepository = sectionsRepository;
    }
    findAll(name) {
        return this.teachersRepository.find({
            where: { nombre: (0, typeorm_2.Like)(`%${name}%`) },
            relations: ['sections', 'sections.enrollments', 'sections.enrollments.student']
        });
    }
    async findOneWithSections(id) {
        return this.teachersRepository.findOne({
            where: { id },
            relations: ['sections']
        });
    }
    async create(data) {
        const teacherData = {
            nombre: data.nombre,
            especialidad: data.especialidad
        };
        const newTeacher = await this.teachersRepository.save(teacherData);
        if (data.materia && data.codigo) {
            const startYear = 2020;
            const yearsToGenerate = 15;
            const sectionsToSave = [];
            for (let i = 0; i < yearsToGenerate; i++) {
                const year = `${startYear + i}-${startYear + i + 1}`;
                const section = this.sectionsRepository.create({
                    nombre: data.materia,
                    code: data.codigo,
                    year: year,
                    teacher: newTeacher
                });
                sectionsToSave.push(section);
            }
            await this.sectionsRepository.save(sectionsToSave);
        }
        return newTeacher;
    }
    async delete(id) {
        return this.teachersRepository.delete(id);
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(1, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map