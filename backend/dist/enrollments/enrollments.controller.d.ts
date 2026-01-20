import { EnrollmentsService } from './enrollments.service';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    updateGrades(id: string, grades: {
        grade1?: string;
        grade2?: string;
        grade3?: string;
        gradeFinal?: string;
    }): Promise<import("./enrollment.entity").Enrollment>;
}
