import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Section } from '../sections/section.entity';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    especialidad: string;

    @OneToMany(() => Section, (section) => section.teacher)
    sections: Section[];
}
