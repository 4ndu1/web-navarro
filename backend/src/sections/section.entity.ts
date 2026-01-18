import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';
import { Enrollment } from '../enrollments/enrollment.entity';

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    year: string;

    @Column()
    code: string;

    @ManyToOne(() => Teacher, (teacher) => teacher.sections)
    teacher: Teacher;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.section)
    enrollments: Enrollment[];
}
