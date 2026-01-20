import { Controller, Get, Param } from '@nestjs/common';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
    constructor(private readonly sectionsService: SectionsService) { }

    @Get()
    findAll() {
        return this.sectionsService.findAll();
    }

    @Get(':id/students')
    findOne(@Param('id') id: string) {
        return this.sectionsService.findOneWithStudents(+id);
    }
}
