import { Student } from '../students/student.entity';
import { Section } from '../sections/section.entity';
export declare class Enrollment {
    id: number;
    student: Student;
    section: Section;
    grade: number;
}
