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

    async findOneWithStudents(id: number) {
        const section = await this.sectionsRepository.findOne({
            where: { id },
            relations: ['enrollments', 'enrollments.student']
        });
        return section;
    }
}
