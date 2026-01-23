import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './students/student.entity';
import { Teacher } from './teachers/teacher.entity';
import { Section } from './sections/section.entity';
import { Enrollment } from './enrollments/enrollment.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(Enrollment) private enrollmentRepo: Repository<Enrollment>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async seed() {
    try {
      // Clear existing data (optional, but good for idempotent)
      await this.enrollmentRepo.createQueryBuilder().delete().execute();
      await this.sectionRepo.createQueryBuilder().delete().execute();
      await this.teacherRepo.createQueryBuilder().delete().execute();
      await this.studentRepo.createQueryBuilder().delete().execute();

      // Students
      const s1 = await this.studentRepo.save({ nombre: "Luis Gonzalez", cedula: "31.713.516", registro: "2023/01/01" });
      const s2 = await this.studentRepo.save({ nombre: "Elena Rodriguez", cedula: "28.123.456", registro: "2023/01/05" });
      const s3 = await this.studentRepo.save({ nombre: "Carlos Perez", cedula: "30.987.654", registro: "2023/02/10" });
      const s4 = await this.studentRepo.save({ nombre: "Ana Martinez", cedula: "29.555.444", registro: "2023/03/15" });

      // Teachers
      const t1 = await this.teacherRepo.save({ nombre: "Prof. Alberto Fernandez", especialidad: "Matemáticas" });
      const t2 = await this.teacherRepo.save({ nombre: "Prof. Maria Lopez", especialidad: "Física" });
      const t3 = await this.teacherRepo.save({ nombre: "Prof. Juan Castillo", especialidad: "Programación" });

      // Sections
      const sec1 = await this.sectionRepo.save({ nombre: "Matemáticas I", year: "1er Año", teacher: t1, code: "MAT101" });
      const sec2 = await this.sectionRepo.save({ nombre: "Física I", year: "2do Año", teacher: t2, code: "FIS201" });
      const sec3 = await this.sectionRepo.save({ nombre: "Programación Web", year: "3er Año", teacher: t3, code: "WEB301" });
      const sec4 = await this.sectionRepo.save({ nombre: "Matemáticas II", year: "2do Año", teacher: t1, code: "MAT201" });

      // Enrollments
      await this.enrollmentRepo.save({ student: s1, section: sec1, schoolYear: "2023-2024", grade1: "18", grade2: "15", grade3: "19", gradeFinal: "17" });
      await this.enrollmentRepo.save({ student: s1, section: sec3, schoolYear: "2023-2024", grade1: "20", grade2: "20", grade3: "20", gradeFinal: "20" });
      await this.enrollmentRepo.save({ student: s2, section: sec1, schoolYear: "2023-2024", grade1: "15", grade2: "14", grade3: "16", gradeFinal: "15" });
      await this.enrollmentRepo.save({ student: s2, section: sec2, schoolYear: "2023-2024", grade1: "17", grade2: "18", grade3: "16", gradeFinal: "17" });
      await this.enrollmentRepo.save({ student: s3, section: sec3, schoolYear: "2023-2024", grade1: "19", grade2: "18", grade3: "20", gradeFinal: "19" });
      await this.enrollmentRepo.save({ student: s4, section: sec4, schoolYear: "2023-2024", grade1: "12", grade2: "13", grade3: "11", gradeFinal: "12" });

      return "Database seeded successfully!";
    } catch (error) {
      console.error("SEED ERROR:", error);
      return `Error seeding database: ${error.message}`;
    }
  }
}
