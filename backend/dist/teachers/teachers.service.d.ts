import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Section } from '../sections/section.entity';
export declare class TeachersService {
    private teachersRepository;
    private sectionsRepository;
    constructor(teachersRepository: Repository<Teacher>, sectionsRepository: Repository<Section>);
    findAll(name: string): Promise<Teacher[]>;
    findOneWithSections(id: number): Promise<Teacher | null>;
    create(data: any): Promise<{
        nombre: any;
        especialidad: any;
    } & Teacher>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
