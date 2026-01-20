import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(Teacher)
        private teachersRepository: Repository<Teacher>,
    ) { }

    findAll(name: string) {
        return this.teachersRepository.find({
            where: { nombre: Like(`%${name}%`) },
            relations: ['sections', 'sections.enrollments', 'sections.enrollments.student']
        });
    }

    async findOneWithSections(id: number) {
        return this.teachersRepository.findOne({
            where: { id },
            relations: ['sections']
        });
    }

    async create(data: Partial<Teacher>) {
        return this.teachersRepository.save(data);
    }
}
