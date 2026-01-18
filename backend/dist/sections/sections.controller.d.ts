import { SectionsService } from './sections.service';
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    findOne(id: string): Promise<import("./section.entity").Section | null>;
}
