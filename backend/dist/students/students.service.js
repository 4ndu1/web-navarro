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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./student.entity");
const enrollment_entity_1 = require("../enrollments/enrollment.entity");
let StudentsService = class StudentsService {
    studentsRepository;
    enrollmentRepository;
    constructor(studentsRepository, enrollmentRepository) {
        this.studentsRepository = studentsRepository;
        this.enrollmentRepository = enrollmentRepository;
    }
    findAll() {
        return this.studentsRepository.find();
    }
    async search(query) {
        return this.studentsRepository.find({
            where: [
                { nombre: (0, typeorm_2.Like)(`%${query}%`) },
                { cedula: (0, typeorm_2.Like)(`%${query}%`) }
            ],
            relations: ['enrollments', 'enrollments.section', 'enrollments.section.teacher']
        });
    }
    async findByCedula(cedula) {
        return this.studentsRepository.findOne({
            where: { cedula },
            relations: ['enrollments', 'enrollments.section', 'enrollments.section.teacher']
        });
    }
    async create(data) {
        const { sectionId, schoolYear, ...studentData } = data;
        console.log('Creating student with data:', { sectionId, schoolYear, studentData });
        const student = await this.studentsRepository.save(studentData);
        console.log('Student created with ID:', student.id);
        if (sectionId) {
            try {
                console.log('Creating enrollment for student:', student.id, 'section:', sectionId, 'year:', schoolYear);
                const enrollment = new enrollment_entity_1.Enrollment();
                enrollment.student = student;
                enrollment.section = { id: parseInt(sectionId) };
                enrollment.schoolYear = schoolYear || '2024-2025';
                enrollment.grade1 = '';
                enrollment.grade2 = '';
                enrollment.grade3 = '';
                enrollment.gradeFinal = '';
                const savedEnrollment = await this.enrollmentRepository.save(enrollment);
                console.log('Enrollment created successfully:', savedEnrollment);
            }
            catch (error) {
                console.error('Error creating enrollment:', error);
                throw error;
            }
        }
        else {
            console.log('No sectionId provided, skipping enrollment');
        }
        return student;
    }
    async delete(id) {
        await this.enrollmentRepository.delete({ student: { id } });
        return this.studentsRepository.delete(id);
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map