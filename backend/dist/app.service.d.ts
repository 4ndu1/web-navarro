import { Repository } from 'typeorm';
import { Student } from './students/student.entity';
import { Teacher } from './teachers/teacher.entity';
import { Section } from './sections/section.entity';
import { Enrollment } from './enrollments/enrollment.entity';
export declare class AppService {
    private studentRepo;
    private teacherRepo;
    private sectionRepo;
    private enrollmentRepo;
    constructor(studentRepo: Repository<Student>, teacherRepo: Repository<Teacher>, sectionRepo: Repository<Section>, enrollmentRepo: Repository<Enrollment>);
    getHello(): string;
    seed(): Promise<string>;
}
