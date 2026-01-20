import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './section.entity';

@Injectable()
export class SectionsService {
    constructor(
        @InjectRepository(Section)
        private sectionsRepository: Repository<Section>,
    ) { }

    async findAll() {
        return this.sectionsRepository.find({
            relations: ['teacher']
        });
    }

    async findOneWithStudents(id: number, schoolYear?: string) {
        const query = this.sectionsRepository.createQueryBuilder('section')
            .leftJoinAndSelect('section.enrollments', 'enrollment', schoolYear ? 'enrollment.schoolYear = :schoolYear' : '1=1', { schoolYear })
            .leftJoinAndSelect('enrollment.student', 'student')
            .where('section.id = :id', { id });

        const section = await query.getOne();
        return section;
    }
}
