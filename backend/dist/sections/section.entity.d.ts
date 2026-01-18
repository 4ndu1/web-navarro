import { Teacher } from '../teachers/teacher.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
export declare class Section {
    id: number;
    nombre: string;
    year: string;
    code: string;
    teacher: Teacher;
    enrollments: Enrollment[];
}
