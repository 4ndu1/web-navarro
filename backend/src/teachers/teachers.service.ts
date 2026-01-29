import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Section } from '../sections/section.entity';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(Teacher)
        private teachersRepository: Repository<Teacher>,
        @InjectRepository(Section)
        private sectionsRepository: Repository<Section>,
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

    async create(data: any) {
        // 1. Create Teacher
        const teacherData = {
            nombre: data.nombre,
            especialidad: data.especialidad
        };
        const newTeacher = await this.teachersRepository.save(teacherData);

        // 2. Create Section for ALL school years if provided
        // Logic duplicated from frontend to ensure consistency (2020 + 15 years)
        if (data.materia && data.codigo) {
            const startYear = 2020;
            const yearsToGenerate = 15;
            const sectionsToSave: Section[] = [];

            for (let i = 0; i < yearsToGenerate; i++) {
                const year = `${startYear + i}-${startYear + i + 1}`;
                const section = this.sectionsRepository.create({
                    nombre: data.materia,
                    code: data.codigo,
                    year: year,
                    teacher: newTeacher
                });
                sectionsToSave.push(section);
            }

            await this.sectionsRepository.save(sectionsToSave);
        }

        return newTeacher;
    }

    async delete(id: number) {
        return this.teachersRepository.delete(id);
    }
}
