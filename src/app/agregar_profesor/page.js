'use client';
import { useState } from "react";
import { api } from "@/services/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, PlusCircle, GraduationCap } from "lucide-react";

export default function PageAgregarProfesor() {
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
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Gestión de Profesores" />
                <main className="flex-1 overflow-y-auto p-6 flex justify-center items-start pt-10">
                    <Card className="w-full max-w-2xl">
                        <CardHeader>
                            <CardTitle>Agregar Nuevo Profesor</CardTitle>
                            <CardDescription>Registre un nuevo docente en el sistema académico.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Nombre Completo
                                    </label>
                                    <Input
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ej. Prof. Alberto Fernandez"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Especialidad
                                    </label>
                                    <Input
                                        name="especialidad"
                                        value={formData.especialidad}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ej. Matemáticas"
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" className="w-full" disabled={status === "loading"}>
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Registrar Profesor
                                            </>
                                        )}
                                    </Button>

                                    {status === "success" && (
                                        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                                            ¡Profesor creado exitosamente!
                                        </div>
                                    )}
                                    {status === "error" && (
                                        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
                                            Error al crear profesor.
                                        </div>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
