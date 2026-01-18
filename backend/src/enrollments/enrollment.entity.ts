import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from '../students/student.entity';
import { Section } from '../sections/section.entity';

@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.enrollments)
    student: Student;

    @ManyToOne(() => Section, (section) => section.enrollments)
    section: Section;

    @Column()
    grade: number;
}
