import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
export declare class EnrollmentsService {
    private enrollmentRepository;
    constructor(enrollmentRepository: Repository<Enrollment>);
    updateGrades(id: number, grades: {
        grade1?: string;
        grade2?: string;
        grade3?: string;
        gradeFinal?: string;
    }): Promise<Enrollment>;
}
