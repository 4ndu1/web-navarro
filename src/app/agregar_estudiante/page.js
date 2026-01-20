'use client';
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, PlusCircle } from "lucide-react";

// Generate school years from 2012-2013 to 2026-2027
const generateSchoolYears = () => {
    const years = [];
    for (let i = 2012; i <= 2026; i++) {
        years.push(`${i}-${i + 1}`);
    }
    return years;
};

const SCHOOL_YEARS = generateSchoolYears();

export default function PageAgregarEstudiante() {
    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        registro: new Date().toISOString().split('T')[0],
        sectionId: "",
        schoolYear: "2024-2025"
    });
    const [sections, setSections] = useState([]);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const data = await api.getSections();
                setSections(data);
            } catch (error) {
                console.error("Error fetching sections:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSections();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await api.createStudent(formData);
            setStatus("success");
            setFormData({
                nombre: "",
                cedula: "",
                registro: new Date().toISOString().split('T')[0],
                sectionId: "",
                schoolYear: "2024-2025"
            });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

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
                                    <label className="text-sm font-medium leading-none">
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

                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Año Escolar
                                    </label>
                                    <select
                                        name="schoolYear"
                                        value={formData.schoolYear}
                                        onChange={handleChange}
                                        required
                                        className={selectClass}
                                    >
                                        {SCHOOL_YEARS.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none">
                                        Grupo Estable
                                    </label>
                                    {loading ? (
                                        <div className="flex items-center gap-2 p-3 border rounded-md bg-slate-50">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span className="text-sm text-muted-foreground">Cargando grupos...</span>
                                        </div>
                                    ) : (
                                        <select
                                            name="sectionId"
                                            value={formData.sectionId}
                                            onChange={handleChange}
                                            required
                                            className={selectClass}
                                        >
                                            <option value="">Seleccione un grupo estable</option>
                                            {sections.map((section) => (
                                                <option key={section.id} value={section.id}>
                                                    {section.nombre} - {section.teacher?.nombre || 'Sin profesor'}
                                                </option>
                                            ))}
                                        </select>
                                    )}
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
