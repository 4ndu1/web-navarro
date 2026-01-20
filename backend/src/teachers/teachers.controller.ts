import { Controller, Get, Param, Query, Post, Body, Delete } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) { }

    @Get()
    findAll(@Query('name') name: string) {
        return this.teachersService.findAll(name || '');
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teachersService.findOneWithSections(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.teachersService.create(body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.teachersService.delete(+id);
    }
}
