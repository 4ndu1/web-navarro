export const students = [
    { id: 1, nombre: "Luis Gonzalez", cedula: "31.713.516", registro: "2023/01/01" },
    { id: 2, nombre: "Elena Rodriguez", cedula: "28.123.456", registro: "2023/01/05" },
    { id: 3, nombre: "Carlos Perez", cedula: "30.987.654", registro: "2023/02/10" },
    { id: 4, nombre: "Ana Martinez", cedula: "29.555.444", registro: "2023/03/15" },
];

export const teachers = [
    { id: 1, nombre: "Prof. Alberto Fernandez", especialidad: "Matemáticas" },
    { id: 2, nombre: "Prof. Maria Lopez", especialidad: "Física" },
    { id: 3, nombre: "Prof. Juan Castillo", especialidad: "Programación" },
];

export const sections = [
    { id: 1, nombre: "Matemáticas I", year: "1er Año", teacherId: 1, code: "MAT101" },
    { id: 2, nombre: "Física I", year: "2do Año", teacherId: 2, code: "FIS201" },
    { id: 3, nombre: "Programación Web", year: "3er Año", teacherId: 3, code: "WEB301" },
    { id: 4, nombre: "Matemáticas II", year: "2do Año", teacherId: 1, code: "MAT201" },
];

export const enrollments = [
    { studentId: 1, sectionId: 1, grade: 18 }, // Luis in Mat1
    { studentId: 1, sectionId: 3, grade: 20 }, // Luis in Web
    { studentId: 2, sectionId: 1, grade: 15 }, // Elena in Mat1
    { studentId: 2, sectionId: 2, grade: 17 }, // Elena in Fis1
    { studentId: 3, sectionId: 3, grade: 19 }, // Carlos in Web
    { studentId: 4, sectionId: 4, grade: 12 }, // Ana in Mat2
];
