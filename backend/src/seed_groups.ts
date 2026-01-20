
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Teacher } from './teachers/teacher.entity';
import { Section } from './sections/section.entity';

const DATA = [
    { section: 'Lazos y cintillos', teacher: 'Norbelis Baruta' },
    { section: 'Manualidades y algo más', teacher: 'Yojama Villarroel' },
    { section: 'Danza', teacher: 'Oriana' },
    { section: 'Lectura y escritura', teacher: 'Marbelis Barrio' },
    { section: 'Dulcería y algo más', teacher: 'Yolanda' },
    { section: 'Dibujo Tecnico A', teacher: 'Miguel barrio' },
    { section: 'Dibujo tecnico B', teacher: 'Alexander Sicila' },
    { section: 'Manualidades', teacher: 'Maulys Rodriguez' },
    { section: 'Dibujo Libre', teacher: 'Coromoto Miranda' },
    { section: 'Panaderia', teacher: 'Jose Salazar' },
    { section: 'Manualidades A', teacher: 'Migueta Villaroel' },
    { section: 'Manualidades B', teacher: 'Jenny Tocuyo' },
    { section: 'Deporte A', teacher: 'Carlo Cabello' },
    { section: 'Deporte B', teacher: 'Giobanny Ullin' },
    { section: 'Gastronomia', teacher: 'Rozibell Zerpa' },
    { section: 'Costura Reciclada', teacher: 'Yelis Montana' },
    { section: 'Canto', teacher: 'Del Valle Villarroel' },
    { section: 'Recuperando Espacio A', teacher: 'Greco párica' },
    { section: 'Recuperando Espacio B', teacher: 'Carmen Jimenez' },
    { section: 'Arte', teacher: 'Domingo guajis' },
    { section: 'Ajedrez', teacher: 'Rafael Ventría' },
    { section: 'Salud y bienestar', teacher: 'Noemy Gonzalez' },
];

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);
    const teacherRepo = dataSource.getRepository(Teacher);
    const sectionRepo = dataSource.getRepository(Section);

    console.log('Starting seed...');

    for (const item of DATA) {
        // 1. Find or Create Teacher
        // Use normalized name for search
        const teacherName = item.teacher.trim();
        let teacher = await teacherRepo.findOne({ where: { nombre: teacherName } });

        if (!teacher) {
            teacher = teacherRepo.create({
                nombre: teacherName,
                especialidad: 'Instructor GE', // GE = Grupos Estables
            });
            await teacherRepo.save(teacher);
            console.log(`Created teacher: ${teacherName}`);
        }

        // 2. Find or Create Section
        const sectionName = item.section.trim();
        let section = await sectionRepo.findOne({ where: { nombre: sectionName } });

        if (!section) {
            section = sectionRepo.create({
                nombre: sectionName,
                year: '2024-2025',
                code: `GE-${Math.floor(Math.random() * 10000)}`, // Random code for now
                teacher: teacher,
            });
            await sectionRepo.save(section);
            console.log(`Created section: ${sectionName} assigned to ${teacherName}`);
        } else {
            // Ensure teacher is assigned (in case it wasn't or changed)
            if (!section.teacher || section.teacher.id !== teacher.id) {
                section.teacher = teacher;
                await sectionRepo.save(section);
                console.log(`Updated section: ${sectionName} re-assigned to ${teacherName}`);
            }
        }
    }

    console.log('Seed complete!');
    await app.close();
}

bootstrap();
