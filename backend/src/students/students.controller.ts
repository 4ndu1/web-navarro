import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get()
    findAll() {
        return this.studentsService.findAll();
    }

    @Get('search')
    findByCedula(@Query('cedula') cedula: string) {
        return this.studentsService.findByCedula(cedula);
    }

    @Post()
    create(@Body() body: any) {
        return this.studentsService.create(body);
    }
}
