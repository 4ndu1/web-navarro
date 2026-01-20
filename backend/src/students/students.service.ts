import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Student } from './student.entity';
import { Enrollment } from '../enrollments/enrollment.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private studentsRepository: Repository<Student>,
        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>,
    ) { }

    findAll() {
        return this.studentsRepository.find();
    }

    async search(query: string) {
        return this.studentsRepository.find({
            where: [
                { nombre: Like(`%${query}%`) },
                { cedula: Like(`%${query}%`) }
            ],
            relations: ['enrollments', 'enrollments.section', 'enrollments.section.teacher']
        });
    }

    async findByCedula(cedula: string) {
        return this.studentsRepository.findOne({
            where: { cedula },
            relations: ['enrollments', 'enrollments.section', 'enrollments.section.teacher']
        });
    }

    async create(data: any) {
        const { sectionId, schoolYear, ...studentData } = data;

        console.log('Creating student with data:', { sectionId, schoolYear, studentData });

        // Create student
        const student = await this.studentsRepository.save(studentData);
        console.log('Student created with ID:', student.id);

        // If sectionId provided, create enrollment
        if (sectionId) {
            try {
                console.log('Creating enrollment for student:', student.id, 'section:', sectionId, 'year:', schoolYear);

                // Create enrollment using raw insert to avoid TypeScript issues
                const enrollment = new Enrollment();
                enrollment.student = student;
                enrollment.section = { id: parseInt(sectionId) } as any;
                enrollment.schoolYear = schoolYear || '2024-2025';
                enrollment.grade1 = '';
                enrollment.grade2 = '';
                enrollment.grade3 = '';
                enrollment.gradeFinal = '';

                const savedEnrollment = await this.enrollmentRepository.save(enrollment);
                console.log('Enrollment created successfully:', savedEnrollment);
            } catch (error) {
                console.error('Error creating enrollment:', error);
                throw error;
            }
        } else {
            console.log('No sectionId provided, skipping enrollment');
        }

        return student;
    }

    async delete(id: number) {
        // First delete all enrollments for this student
        await this.enrollmentRepository.delete({ student: { id } });
        // Then delete the student
        return this.studentsRepository.delete(id);
    }
}
