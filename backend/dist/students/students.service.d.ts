import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
export declare class StudentsService {
    private studentsRepository;
    private enrollmentRepository;
    constructor(studentsRepository: Repository<Student>, enrollmentRepository: Repository<Enrollment>);
    findAll(): Promise<Student[]>;
    search(query: string): Promise<Student[]>;
    findByCedula(cedula: string): Promise<Student | null>;
    create(data: any): Promise<any>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
