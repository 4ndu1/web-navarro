"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const student_entity_1 = require("./students/student.entity");
const teacher_entity_1 = require("./teachers/teacher.entity");
const section_entity_1 = require("./sections/section.entity");
const enrollment_entity_1 = require("./enrollments/enrollment.entity");
const students_module_1 = require("./students/students.module");
const teachers_module_1 = require("./teachers/teachers.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'web_navarro',
                entities: [student_entity_1.Student, teacher_entity_1.Teacher, section_entity_1.Section, enrollment_entity_1.Enrollment],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([student_entity_1.Student, teacher_entity_1.Teacher, section_entity_1.Section, enrollment_entity_1.Enrollment]),
            students_module_1.StudentsModule,
            teachers_module_1.TeachersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map