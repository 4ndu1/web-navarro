import { SectionsService } from './sections.service';
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    findAll(): Promise<import("./section.entity").Section[]>;
    findOne(id: string, schoolYear: string): Promise<import("./section.entity").Section | null>;
}
