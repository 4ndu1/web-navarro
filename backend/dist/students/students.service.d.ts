import { Repository } from 'typeorm';
import { Student } from './student.entity';
export declare class StudentsService {
    private studentsRepository;
    constructor(studentsRepository: Repository<Student>);
    findAll(): Promise<Student[]>;
    findByCedula(cedula: string): Promise<Student | null>;
    create(data: Partial<Student>): Promise<Partial<Student> & Student>;
}
