import { Controller, Patch, Param, Body } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) { }

    @Patch(':id')
    updateGrades(
        @Param('id') id: string,
        @Body() grades: { grade1?: string; grade2?: string; grade3?: string; gradeFinal?: string }
    ) {
        return this.enrollmentsService.updateGrades(+id, grades);
    }
}
