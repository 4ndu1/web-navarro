import { students, teachers, sections, enrollments } from './mockData';

export const api = {
    getStats: async () => {
        return {
            totalStudents: students.length,
            totalTeachers: teachers.length,
            lastStudent: students[students.length - 1],
        };
    },

    getAllStudents: async () => {
        return students;
    },

    searchStudentByCedula: async (cedula) => {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const student = students.find(s => s.cedula === cedula);
        if (!student) return null;

        // Get student's enrollments
        const studentEnrollments = enrollments.filter(e => e.studentId === student.id);

        // Enrich with section data
        const detailedEnrollments = studentEnrollments.map(e => {
            const section = sections.find(s => s.id === e.sectionId);
            const teacher = teachers.find(t => t.id === section.teacherId);
            return {
                ...e,
                sectionName: section.nombre,
                sectionCode: section.code,
                teacherName: teacher.nombre,
            };
        });

        return {
            ...student,
            enrollments: detailedEnrollments
        };
    },

    searchTeacherByName: async (nameQuery) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const lowerQuery = nameQuery.toLowerCase();
        return teachers.filter(t => t.nombre.toLowerCase().includes(lowerQuery));
    },

    getTeacherSections: async (teacherId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return sections.filter(s => s.teacherId === teacherId);
    },

    getSectionStudents: async (sectionId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const sectionEnrollments = enrollments.filter(e => e.sectionId === sectionId);

        return sectionEnrollments.map(e => {
            const student = students.find(s => s.id === e.studentId);
            return {
                ...student,
                grade: e.grade
            };
        });
    }
};
