'use client';
import { useState } from 'react';
import { api } from "@/services/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, BookOpen, User, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PageProfesores() {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);
        setSelectedTeacher(null);
        setSelectedSection(null);
        setTeachers([]);
        try {
            const result = await api.searchTeacherByName(searchTerm);
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
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Consulta de Profesores" />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Search Bar */}
                        <div className="flex gap-4 items-center">
                            <Input
                                placeholder="Nombre del profesor"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="max-w-md"
                            />
                            <Button onClick={handleSearch} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                                Buscar
                            </Button>
                        </div>

                        {/* Listado de Profesores */}
                        {!selectedTeacher && teachers.length > 0 && (
                            <Card className="animate-in slide-in-from-bottom-4 duration-500">
                                <CardHeader>
                                    <CardTitle>Resultados de Búsqueda</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nombre</TableHead>
                                                <TableHead>Especialidad</TableHead>
                                                <TableHead className="text-right">Acción</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {teachers.map((t) => (
                                                <TableRow key={t.id}>
                                                    <TableCell className="font-medium">{t.nombre}</TableCell>
                                                    <TableCell><Badge variant="outline">{t.especialidad}</Badge></TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" onClick={() => handleSelectTeacher(t)} className="text-primary hover:text-primary/80">
                                                            Ver Secciones
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )}

                        {/* Secciones del Profesor */}
                        {selectedTeacher && !selectedSection && (
                            <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                                <Button variant="ghost" onClick={() => setSelectedTeacher(null)} className="pl-0 gap-2">
                                    <ArrowLeft className="h-4 w-4" /> Volver a resultados
                                </Button>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                                {selectedTeacher.nombre.charAt(0)}
                                            </div>
                                            <div>
                                                <CardTitle>{selectedTeacher.nombre}</CardTitle>
                                                <p className="text-sm text-muted-foreground">{selectedTeacher.especialidad}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <h3 className="text-lg font-medium mb-4">Secciones Asignadas</h3>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Materia</TableHead>
                                                    <TableHead>Año</TableHead>
                                                    <TableHead>Código</TableHead>
                                                    <TableHead className="text-right">Acción</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {sections.map((s) => (
                                                    <TableRow key={s.id}>
                                                        <TableCell>{s.nombre}</TableCell>
                                                        <TableCell>{s.year}</TableCell>
                                                        <TableCell>{s.code}</TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="sm" onClick={() => handleSelectSection(s)} className="text-primary hover:text-primary/80">
                                                                Ver Estudiantes
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Estudiantes de la Sección */}
                        {selectedSection && (
                            <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                                <Button variant="ghost" onClick={() => setSelectedSection(null)} className="pl-0 gap-2">
                                    <ArrowLeft className="h-4 w-4" /> Volver a secciones
                                </Button>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Estudiantes en {selectedSection.nombre} ({selectedSection.year})</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Nombre</TableHead>
                                                    <TableHead>Cédula</TableHead>
                                                    <TableHead>Nota Actual</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {students.map((s, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell className="font-medium">{s.nombre}</TableCell>
                                                        <TableCell>{s.cedula}</TableCell>
                                                        <TableCell><Badge variant="secondary">{s.grade} pts</Badge></TableCell>
                                                    </TableRow>
                                                ))}
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
