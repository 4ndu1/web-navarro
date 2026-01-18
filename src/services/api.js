const API_URL = 'http://localhost:3001';

export const api = {
    getStats: async () => {
        // We haven't implemented getStats on backend yet, we can mock it or fetch students + teachers
        // For now, let's just fetch all students to get count
        const studentsRes = await fetch(`${API_URL}/students`);
        const students = await studentsRes.json();
        const teachersRes = await fetch(`${API_URL}/teachers`);
        const teachers = await teachersRes.json();

        return {
            totalStudents: students.length,
            totalTeachers: teachers.length,
            lastStudent: students[students.length - 1] || null,
        };
    },

    getAllStudents: async () => {
        const res = await fetch(`${API_URL}/students`);
        return res.json();
    },

    searchStudentByCedula: async (cedula) => {
        const res = await fetch(`${API_URL}/students/search?cedula=${cedula}`);
        const student = await res.json();
        if (!student) return null;

        // Backend returns student with enrollments -> section -> teacher
        // We need to map to format expected by UI if different
        // UI expects: enrollments: [{ ..., sectionName, teacherName }]
        // Backend returns: enrollments: [{ section: { nombre, teacher: { nombre } } }]

        const mappedEnrollments = student.enrollments.map(e => ({
            ...e,
            sectionName: e.section.nombre,
            sectionCode: e.section.code,
            teacherName: e.section.teacher.nombre,
            grade: e.grade
        }));

        return {
            ...student,
            enrollments: mappedEnrollments
        };
    },

    searchTeacherByName: async (name) => {
        const res = await fetch(`${API_URL}/teachers?name=${name}`);
        return res.json();
    },

    getTeacherSections: async (teacherId) => {
        const res = await fetch(`${API_URL}/teachers/${teacherId}`);
        const teacher = await res.json();
        return teacher.sections;
    },

    getSectionStudents: async (sectionId) => {
        const res = await fetch(`${API_URL}/sections/${sectionId}/students`);
        const section = await res.json();

        return section.enrollments.map(e => ({
            ...e.student,
            grade: e.grade
        }));
    },

    createStudent: async (data) => {
        const res = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    createTeacher: async (data) => {
        const res = await fetch(`${API_URL}/teachers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    }
};
