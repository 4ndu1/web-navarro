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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("./students/student.entity");
const teacher_entity_1 = require("./teachers/teacher.entity");
const section_entity_1 = require("./sections/section.entity");
const enrollment_entity_1 = require("./enrollments/enrollment.entity");
let AppService = class AppService {
    studentRepo;
    teacherRepo;
    sectionRepo;
    enrollmentRepo;
    constructor(studentRepo, teacherRepo, sectionRepo, enrollmentRepo) {
        this.studentRepo = studentRepo;
        this.teacherRepo = teacherRepo;
        this.sectionRepo = sectionRepo;
        this.enrollmentRepo = enrollmentRepo;
    }
    getHello() {
        return 'Hello World!';
    }
    async seed() {
        try {
            await this.enrollmentRepo.createQueryBuilder().delete().execute();
            await this.sectionRepo.createQueryBuilder().delete().execute();
            await this.teacherRepo.createQueryBuilder().delete().execute();
            await this.studentRepo.createQueryBuilder().delete().execute();
            const s1 = await this.studentRepo.save({ nombre: "Luis Gonzalez", cedula: "31.713.516", registro: "2023/01/01" });
            const s2 = await this.studentRepo.save({ nombre: "Elena Rodriguez", cedula: "28.123.456", registro: "2023/01/05" });
            const s3 = await this.studentRepo.save({ nombre: "Carlos Perez", cedula: "30.987.654", registro: "2023/02/10" });
            const s4 = await this.studentRepo.save({ nombre: "Ana Martinez", cedula: "29.555.444", registro: "2023/03/15" });
            const t1 = await this.teacherRepo.save({ nombre: "Prof. Alberto Fernandez", especialidad: "Matemáticas" });
            const t2 = await this.teacherRepo.save({ nombre: "Prof. Maria Lopez", especialidad: "Física" });
            const t3 = await this.teacherRepo.save({ nombre: "Prof. Juan Castillo", especialidad: "Programación" });
            const sec1 = await this.sectionRepo.save({ nombre: "Matemáticas I", year: "1er Año", teacher: t1, code: "MAT101" });
            const sec2 = await this.sectionRepo.save({ nombre: "Física I", year: "2do Año", teacher: t2, code: "FIS201" });
            const sec3 = await this.sectionRepo.save({ nombre: "Programación Web", year: "3er Año", teacher: t3, code: "WEB301" });
            const sec4 = await this.sectionRepo.save({ nombre: "Matemáticas II", year: "2do Año", teacher: t1, code: "MAT201" });
            await this.enrollmentRepo.save({ student: s1, section: sec1, grade: 18 });
            await this.enrollmentRepo.save({ student: s1, section: sec3, grade: 20 });
            await this.enrollmentRepo.save({ student: s2, section: sec1, grade: 15 });
            await this.enrollmentRepo.save({ student: s2, section: sec2, grade: 17 });
            await this.enrollmentRepo.save({ student: s3, section: sec3, grade: 19 });
            await this.enrollmentRepo.save({ student: s4, section: sec4, grade: 12 });
            return "Database seeded successfully!";
        }
        catch (error) {
            console.error("SEED ERROR:", error);
            return `Error seeding database: ${error.message}`;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __param(2, (0, typeorm_1.InjectRepository)(section_entity_1.Section)),
    __param(3, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map