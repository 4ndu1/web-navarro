import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Student, Enrollment])],
    controllers: [StudentsController],
    providers: [StudentsService],
})
export class StudentsModule { }
