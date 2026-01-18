"use client";
import { useState } from "react";
import { api } from "@/services/api";

function PageAgregarProfesor() {
    const [formData, setFormData] = useState({
        nombre: "",
        especialidad: ""
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await api.createTeacher(formData);
            setStatus("success");
            setFormData({ nombre: "", especialidad: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4 border-slate-100">Agregar Profesor</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nombre Completo</label>
                    <input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Ej. Prof. Alberto Fernandez"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Especialidad</label>
                    <input
                        name="especialidad"
                        value={formData.especialidad}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Ej. Matemáticas"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {status === "loading" ? "Guardando..." : "Registrar Profesor"}
                    </button>

                    {status === "success" && (
                        <p className="mt-4 text-green-600 font-medium text-center bg-green-50 p-3 rounded-lg border border-green-200">
                            ¡Profesor creado exitosamente!
                        </p>
                    )}
                    {status === "error" && (
                        <p className="mt-4 text-red-600 font-medium text-center bg-red-50 p-3 rounded-lg border border-red-200">
                            Error al crear profesor. Intente nuevamente.
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}

export default PageAgregarProfesor;
