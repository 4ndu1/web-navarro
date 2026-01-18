'use client';
import { useState } from 'react';
import SearchBar from "@/components/SearchBar";
import ListBox from "@/components/ListBox";
import { api } from "@/services/api";

export default function PageProfesores() {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (name) => {
        setLoading(true);
        setSelectedTeacher(null);
        setSelectedSection(null);
        setTeachers([]);
        try {
            const result = await api.searchTeacherByName(name);
            setTeachers(result);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTeacher = async (teacher) => {
        setSelectedTeacher(teacher);
        setSelectedSection(null);
        const result = await api.getTeacherSections(teacher.id);
        setSections(result);
    };

    const handleSelectSection = async (section) => {
        setSelectedSection(section);
        const result = await api.getSectionStudents(section.id);
        setStudents(result);
    };

    return (
        <div className="flex flex-col items-center mt-10 w-full mb-20">
            <h1 className="text-3xl font-bold mb-8">Consultar Profesores</h1>
            <SearchBar onSearch={handleSearch} placeholder="Nombre del profesor" />

            {loading && <p className="mt-4">Buscando...</p>}

            {/* Teacher List */}
            {!selectedTeacher && teachers.length > 0 && (
                <div className="mt-10">
                    <ListBox
                        mainText="Resultados de Búsqueda"
                        headers={["Nombre", "Especialidad", "Acción"]}
                        data={teachers}
                        renderRow={(t) => (
                            <div className="grid grid-cols-3 gap-10 px-4 items-center">
                                <h3>{t.nombre}</h3>
                                <h3>{t.especialidad}</h3>
                                <button
                                    onClick={() => handleSelectTeacher(t)}
                                    className="text-blue-600 hover:underline text-left"
                                >
                                    Ver Secciones
                                </button>
                            </div>
                        )}
                    />
                </div>
            )}

            {/* Sections List */}
            {selectedTeacher && !selectedSection && (
                <div className="mt-10 flex flex-col items-center gap-4">
                    <button onClick={() => setSelectedTeacher(null)} className="self-start text-gray-500 hover:text-black">
                        &larr; Volver a resultados
                    </button>
                    <div className="bg-blue-50 p-4 rounded w-full text-center mb-4">
                        Profesor: <strong>{selectedTeacher.nombre}</strong>
                    </div>
                    <ListBox
                        mainText="Secciones Asignadas"
                        headers={["Materia", "Año", "Código", "Acción"]}
                        data={sections}
                        renderRow={(s) => (
                            <div className="grid grid-cols-4 gap-4 px-4 items-center">
                                <h3>{s.nombre}</h3>
                                <h3>{s.year}</h3>
                                <h3>{s.code}</h3>
                                <button
                                    onClick={() => handleSelectSection(s)}
                                    className="text-blue-600 hover:underline text-left"
                                >
                                    Ver Estudiantes
                                </button>
                            </div>
                        )}
                    />
                </div>
            )}

            {/* Students List */}
            {selectedSection && (
                <div className="mt-10 flex flex-col items-center gap-4">
                    <button onClick={() => setSelectedSection(null)} className="self-start text-gray-500 hover:text-black">
                        &larr; Volver a secciones
                    </button>
                    <div className="bg-green-50 p-4 rounded w-full text-center mb-4">
                        Sección: <strong>{selectedSection.nombre} ({selectedSection.year})</strong>
                    </div>
                    <ListBox
                        mainText="Estudiantes Inscritos"
                        headers={["Nombre", "Cédula", "Nota Actual"]}
                        data={students}
                        renderRow={(s) => (
                            <div className="grid grid-cols-3 gap-10 px-4">
                                <h3>{s.nombre}</h3>
                                <h3>{s.cedula}</h3>
                                <h3 className="font-bold">{s.grade} pts</h3>
                            </div>
                        )}
                    />
                </div>
            )}
        </div>
    );
}