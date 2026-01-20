import { Repository } from 'typeorm';
import { Section } from './section.entity';
export declare class SectionsService {
    private sectionsRepository;
    constructor(sectionsRepository: Repository<Section>);
    findAll(): Promise<Section[]>;
    findOneWithStudents(id: number): Promise<Section | null>;
}
