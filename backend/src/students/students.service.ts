import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private studentsRepository: Repository<Student>,
    ) { }

    findAll() {
        return this.studentsRepository.find();
    }

    async findByCedula(cedula: string) {
        const student = await this.studentsRepository.findOne({
            where: { cedula },
            relations: ['enrollments', 'enrollments.section', 'enrollments.section.teacher']
        });

        // Transform specifically for frontend expected format if needed,
        // or let frontend adapt. Frontend expects:
        // { ...student, enrollments: [ { ...enrollment, sectionName, teacherName } ] }
        // We will return generic structure and let frontend adapt or flatten here.
        return student;
    }

    async create(data: Partial<Student>) {
        return this.studentsRepository.save(data);
    }
}
