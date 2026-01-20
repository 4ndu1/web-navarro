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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enrollment_entity_1 = require("./enrollment.entity");
let EnrollmentsService = class EnrollmentsService {
    enrollmentRepository;
    constructor(enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }
    async updateGrades(id, grades) {
        const enrollment = await this.enrollmentRepository.findOne({ where: { id } });
        if (!enrollment) {
            throw new Error('Enrollment not found');
        }
        if (grades.grade1 !== undefined)
            enrollment.grade1 = grades.grade1;
        if (grades.grade2 !== undefined)
            enrollment.grade2 = grades.grade2;
        if (grades.grade3 !== undefined)
            enrollment.grade3 = grades.grade3;
        if (grades.gradeFinal !== undefined)
            enrollment.gradeFinal = grades.gradeFinal;
        return this.enrollmentRepository.save(enrollment);
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map