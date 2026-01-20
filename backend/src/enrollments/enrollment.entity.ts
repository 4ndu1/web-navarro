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

    @Column({ type: 'varchar', length: 20 })
    schoolYear: string;

    @Column({ type: 'varchar', length: 2, nullable: true })
    grade1: string;

    @Column({ type: 'varchar', length: 2, nullable: true })
    grade2: string;

    @Column({ type: 'varchar', length: 2, nullable: true })
    grade3: string;

    @Column({ type: 'varchar', length: 2, nullable: true })
    gradeFinal: string;
}
