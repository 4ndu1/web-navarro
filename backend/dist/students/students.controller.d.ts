import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAll(): Promise<import("./student.entity").Student[]>;
    findByCedula(cedula: string): Promise<import("./student.entity").Student | null>;
    create(body: any): Promise<Partial<import("./student.entity").Student> & import("./student.entity").Student>;
}
