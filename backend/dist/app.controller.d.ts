import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    seed(): Promise<string>;
    getStats(): Promise<{
        totalStudents: number;
        totalTeachers: number;
        totalSections: number;
        totalSubjects: number;
    }>;
}
