import { Enrollment } from '../enrollments/enrollment.entity';
export declare class Student {
    id: number;
    nombre: string;
    cedula: string;
    registro: string;
    enrollments: Enrollment[];
}
