import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from './students/student.entity';
import { Teacher } from './teachers/teacher.entity';
import { Section } from './sections/section.entity';
import { Enrollment } from './enrollments/enrollment.entity';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'web_navarro',
      entities: [Student, Teacher, Section, Enrollment],
      synchronize: true, // Auto-create tables for dev
    }),
    TypeOrmModule.forFeature([Student, Teacher, Section, Enrollment]),
    StudentsModule,
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
