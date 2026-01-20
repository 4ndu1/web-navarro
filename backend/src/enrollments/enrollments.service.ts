import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>,
    ) { }

    async updateGrades(id: number, grades: { grade1?: string; grade2?: string; grade3?: string; gradeFinal?: string }) {
        const enrollment = await this.enrollmentRepository.findOne({ where: { id } });
        if (!enrollment) {
            throw new Error('Enrollment not found');
        }

        if (grades.grade1 !== undefined) enrollment.grade1 = grades.grade1;
        if (grades.grade2 !== undefined) enrollment.grade2 = grades.grade2;
        if (grades.grade3 !== undefined) enrollment.grade3 = grades.grade3;
        if (grades.gradeFinal !== undefined) enrollment.gradeFinal = grades.gradeFinal;

        return this.enrollmentRepository.save(enrollment);
    }
}
