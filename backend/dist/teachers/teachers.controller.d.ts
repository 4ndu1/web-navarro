import { TeachersService } from './teachers.service';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    findAll(name: string): Promise<import("./teacher.entity").Teacher[]>;
    findOne(id: string): Promise<import("./teacher.entity").Teacher | null>;
    create(body: any): Promise<Partial<import("./teacher.entity").Teacher> & import("./teacher.entity").Teacher>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
