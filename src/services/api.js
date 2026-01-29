const API_URL = 'http://localhost:3001';

export const api = {
    getStats: async () => {
        const res = await fetch(`${API_URL}/stats`);
        return res.json();
    },

    getAllStudents: async () => {
        const res = await fetch(`${API_URL}/students`);
        return res.json();
    },

    searchStudents: async (query) => {
        const res = await fetch(`${API_URL}/students/search?q=${query}`);
        const students = await res.json();
        if (!students || students.length === 0) return [];

        return students.map(student => {
            const mappedEnrollments = student.enrollments ? student.enrollments.map(e => ({
                id: e.id,
                sectionName: e.section ? e.section.nombre : 'Sin nombre',
                sectionCode: e.section ? e.section.code : '',
                teacherName: e.section && e.section.teacher ? e.section.teacher.nombre : 'Sin profesor',
                schoolYear: e.schoolYear || '',
                grade1: e.grade1 || '',
                grade2: e.grade2 || '',
                grade3: e.grade3 || '',
                gradeFinal: e.gradeFinal || ''
            })) : [];

            return {
                ...student,
                enrollments: mappedEnrollments
            };
        });
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

    getSectionStudents: async (sectionId, schoolYear) => {
        let url = `${API_URL}/sections/${sectionId}/students`;
        if (schoolYear) {
            url += `?schoolYear=${schoolYear}`;
        }
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Error fetching section students: ${res.status}`);
            return [];
        }

        const section = await res.json();
        if (!section || !section.enrollments) return [];

        return section.enrollments.map(e => ({
            ...e.student,
            grade1: e.grade1,
            grade2: e.grade2,
            grade3: e.grade3,
            gradeFinal: e.gradeFinal
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

    getSections: async () => {
        const res = await fetch(`${API_URL}/sections`);
        return res.json();
    },

    createTeacher: async (data) => {
        const res = await fetch(`${API_URL}/teachers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    updateEnrollmentGrades: async (enrollmentId, grades) => {
        const res = await fetch(`${API_URL}/enrollments/${enrollmentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(grades)
        });
        return res.json();
    },

    deleteStudent: async (studentId) => {
        const res = await fetch(`${API_URL}/students/${studentId}`, {
            method: 'DELETE'
        });
        return res.json();
    },

    deleteTeacher: async (teacherId) => {
        const res = await fetch(`${API_URL}/teachers/${teacherId}`, {
            method: 'DELETE'
        });
        return res.json();
    }
};
