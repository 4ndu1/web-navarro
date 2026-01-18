'use client';
import { useState } from "react";
import { api } from "@/services/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, PlusCircle } from "lucide-react";

export default function PageAgregarEstudiante() {
    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        registro: new Date().toISOString().split('T')[0]
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await api.createStudent(formData);
            setStatus("success");
            setFormData({ nombre: "", cedula: "", registro: new Date().toISOString().split('T')[0] });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Registro de Estudiantes" />
                <main className="flex-1 overflow-y-auto p-6 flex justify-center items-start pt-10">
                    <Card className="w-full max-w-2xl">
                        <CardHeader>
                            <CardTitle>Agregar Nuevo Estudiante</CardTitle>
                            <CardDescription>Ingrese los datos personales para registrar al alumno en el sistema.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Nombre Completo
                                    </label>
                                    <Input
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Cédula de Identidad
                                    </label>
                                    <Input
                                        name="cedula"
                                        value={formData.cedula}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ej. 30.123.456"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Fecha de Registro
                                    </label>
                                    <Input
                                        name="registro"
                                        type="date"
                                        value={formData.registro}
                                        onChange={handleChange}
                                        required
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
                                                Registrar Estudiante
                                            </>
                                        )}
                                    </Button>

                                    {status === "success" && (
                                        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                                            ¡Estudiante creado exitosamente!
                                        </div>
                                    )}
                                    {status === "error" && (
                                        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
                                            Error al crear estudiante. Verifique que no esté duplicado.
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
