import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAll(): Promise<import("./student.entity").Student[]>;
    search(q: string): Promise<import("./student.entity").Student[]>;
    create(body: any): Promise<any>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
