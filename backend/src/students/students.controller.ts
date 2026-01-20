import { Controller, Get, Param, Query, Post, Delete, Body } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get()
    findAll() {
        return this.studentsService.findAll();
    }

    @Get('search')
    search(@Query('q') q: string) {
        return this.studentsService.search(q);
    }

    @Post()
    create(@Body() body: any) {
        return this.studentsService.create(body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.studentsService.delete(+id);
    }
}
