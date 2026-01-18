import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
export declare class TeachersService {
    private teachersRepository;
    constructor(teachersRepository: Repository<Teacher>);
    findAll(name: string): Promise<Teacher[]>;
    findOneWithSections(id: number): Promise<Teacher | null>;
    create(data: Partial<Teacher>): Promise<Partial<Teacher> & Teacher>;
}
