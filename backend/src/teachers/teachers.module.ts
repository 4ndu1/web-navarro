import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';

import { Section } from '../sections/section.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Teacher, Section])],
    controllers: [TeachersController],
    providers: [TeachersService],
})
export class TeachersModule { }
