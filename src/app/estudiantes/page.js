'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from "@/services/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PageEstudiantes() {
    const searchParams = useSearchParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cedula, setCedula] = useState("");

    // Auto-search if query param exists
    useEffect(() => {
        const queryCedula = searchParams.get('q');
        if (queryCedula) {
            setCedula(queryCedula);
            handleSearch(queryCedula);
        }
    }, [searchParams]);

    const handleSearch = async (searchCedula = cedula) => {
        if (!searchCedula) return;
        setLoading(true);
        setError(null);
        setStudent(null);
        try {
            const result = await api.searchStudentByCedula(searchCedula);
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
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Consulta de Estudiantes" />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Search Section */}
                        <div className="flex gap-4 items-center">
                            <Input
                                placeholder="Ingrese Cédula (ej: 31.713.516)"
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                className="max-w-md"
                            />
                            <Button onClick={handleSearch} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                                Buscar
                            </Button>
                        </div>

                        {error && (
                            <div className="p-4 rounded-lg bg-red-50 text-red-600 border border-red-200">
                                {error}
                            </div>
                        )}

                        {student && (
                            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                                {/* Student Info Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl">Información del Estudiante</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Nombre Completo</p>
                                                <p className="text-lg font-semibold">{student.nombre}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Cédula</p>
                                                <p className="text-lg font-semibold">{student.cedula}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Fecha de Registro</p>
                                                <p className="text-lg font-semibold">{student.registro}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Estado</p>
                                                <Badge>Activo</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Enrollments Table */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl">Materias Inscritas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Asignatura</TableHead>
                                                    <TableHead>Profesor</TableHead>
                                                    <TableHead>Nota</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {student.enrollments && student.enrollments.length > 0 ? (
                                                    student.enrollments.map((enrollment, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">{enrollment.sectionName}</TableCell>
                                                            <TableCell>{enrollment.teacherName}</TableCell>
                                                            <TableCell>
                                                                <span className={enrollment.grade >= 10 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                                                                    {enrollment.grade}
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                                                            No hay materias inscritas.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
