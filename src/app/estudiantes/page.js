'use client';
import { useState } from 'react';
import SearchBar from "@/components/SearchBar";
import ListBox from "@/components/ListBox";
import { api } from "@/services/api";

function PageEstudiantes() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (cedula) => {
        setLoading(true);
        setError(null);
        setStudent(null);
        try {
            const result = await api.searchStudentByCedula(cedula);
            if (result) {
                setStudent(result);
            } else {
                setError("Estudiante no encontrado");
            }
        } catch (err) {
            setError("Error en la búsqueda");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 w-full">
            <h1 className="text-3xl font-bold mb-8">Consultar Estudiante</h1>
            <SearchBar onSearch={handleSearch} placeholder="Ingrese Cédula (ej: 31.713.516)" />

            {loading && <p className="mt-4 text-blue-500">Buscando...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            {student && (
                <div className="mt-10 flex flex-col gap-8 w-full items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-[600px] border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 text-black">{student.nombre}</h2>
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <p><strong>Cédula:</strong> {student.cedula}</p>
                            <p><strong>Fecha Registro:</strong> {student.registro}</p>
                        </div>
                    </div>

                    <ListBox
                        mainText="Materias Inscritas"
                        headers={["Asignatura", "Profesor", "Nota"]}
                        data={student.enrollments}
                        renderRow={(enrollment) => (
                            <div className="grid grid-cols-3 gap-10 px-4">
                                <h3>{enrollment.sectionName}</h3>
                                <h3>{enrollment.teacherName}</h3>
                                <h3 className={enrollment.grade >= 10 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                    {enrollment.grade}
                                </h3>
                            </div>
                        )}
                    />
                </div>
            )}
        </div>
    );
}

export default PageEstudiantes;