import { Student } from '../students/student.entity';
import { Section } from '../sections/section.entity';
export declare class Enrollment {
    id: number;
    student: Student;
    section: Section;
    schoolYear: string;
    grade1: string;
    grade2: string;
    grade3: string;
    gradeFinal: string;
}
