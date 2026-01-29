'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from "@/services/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Edit2, Save, X, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const GRADE_OPTIONS = ['', 'A', 'B', 'C', 'D', 'E'];

export default function PageEstudiantes() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <SearchEstudiantes />
        </Suspense>
    );
}

function SearchEstudiantes() {
    const searchParams = useSearchParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [editingEnrollment, setEditingEnrollment] = useState(null);
    const [editGrades, setEditGrades] = useState({ grade1: '', grade2: '', grade3: '', gradeFinal: '' });
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
            handleSearch(q);
        }
    }, [searchParams]);

    const handleSearch = async (searchQuery = query) => {
        if (!searchQuery) return;
        setLoading(true);
        setError(null);
        setStudents([]);
        setEditingEnrollment(null);
        try {
            const results = await api.searchStudents(searchQuery);
            if (results && results.length > 0) {
                setStudents(results);
            } else {
                setError("No se encontraron estudiantes");
            }
        } catch (err) {
            console.error(err);
            setError("Error en la búsqueda");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (enrollment) => {
        setEditingEnrollment(enrollment.id);
        setEditGrades({
            grade1: enrollment.grade1 || '',
            grade2: enrollment.grade2 || '',
            grade3: enrollment.grade3 || '',
            gradeFinal: enrollment.gradeFinal || ''
        });
    };

    const handleCancelEdit = () => {
        setEditingEnrollment(null);
        setEditGrades({ grade1: '', grade2: '', grade3: '', gradeFinal: '' });
    };

    const handleSaveGrades = async (enrollmentId) => {
        setSaving(true);
        try {
            await api.updateEnrollmentGrades(enrollmentId, editGrades);
            await handleSearch(query);
            setEditingEnrollment(null);
        } catch (err) {
            console.error('Error saving grades:', err);
            alert('Error al guardar las notas');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteClick = (student) => {
        setDeleteConfirm(student);
    };

    const handleConfirmDelete = async () => {
        if (!deleteConfirm) return;
        setDeleting(true);
        try {
            await api.deleteStudent(deleteConfirm.id);
            setDeleteConfirm(null);
            await handleSearch(query);
        } catch (err) {
            console.error('Error deleting student:', err);
            alert('Error al eliminar estudiante');
        } finally {
            setDeleting(false);
        }
    };

    const formatGrades = (enrollment) => {
        const g1 = enrollment.grade1 || '-';
        const g2 = enrollment.grade2 || '-';
        const g3 = enrollment.grade3 || '-';
        const gF = enrollment.gradeFinal || '-';
        return `1er: ${g1} - 2do: ${g2} - 3er: ${g3} - Final: ${gF}`;
    };

    const selectClass = "h-8 px-2 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Consulta de Estudiantes" />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {/* Search Section */}
                        <div className="flex gap-4 items-center">
                            <Input
                                placeholder="Nombre o Cédula (ej: 31.713.516)"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="max-w-md"
                            />
                            <Button onClick={() => handleSearch()} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                                Buscar
                            </Button>
                        </div>

                        {error && (
                            <div className="p-4 rounded-lg bg-red-50 text-red-600 border border-red-200">
                                {error}
                            </div>
                        )}

                        <div className="space-y-8">
                            {students.map((student) => (
                                <div key={student.id} className="animate-in slide-in-from-bottom-4 duration-500 border-t pt-6 first:border-0 first:pt-0">
                                    <div className="grid gap-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-xl flex justify-between items-center">
                                                    <span>{student.nombre}</span>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{student.cedula}</Badge>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => handleDeleteClick(student)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Registro</p>
                                                        <p className="font-medium">{student.registro}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Estado</p>
                                                        <Badge>Activo</Badge>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-lg">Grupos Estables y Materias</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Grupo / Materia</TableHead>
                                                            <TableHead>Profesor</TableHead>
                                                            <TableHead>Año Escolar</TableHead>
                                                            <TableHead>Notas por Lapso</TableHead>
                                                            <TableHead className="w-24">Acciones</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {student.enrollments && student.enrollments.length > 0 ? (
                                                            student.enrollments.map((enrollment) => (
                                                                <TableRow key={enrollment.id}>
                                                                    <TableCell className="font-medium">{enrollment.sectionName}</TableCell>
                                                                    <TableCell>{enrollment.teacherName}</TableCell>
                                                                    <TableCell className="text-muted-foreground text-sm">
                                                                        {enrollment.schoolYear || '-'}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {editingEnrollment === enrollment.id ? (
                                                                            <div className="flex gap-2 items-center flex-wrap">
                                                                                <div className="flex items-center gap-1">
                                                                                    <span className="text-xs">1er:</span>
                                                                                    <select
                                                                                        value={editGrades.grade1}
                                                                                        onChange={(e) => setEditGrades({ ...editGrades, grade1: e.target.value })}
                                                                                        className={selectClass}
                                                                                    >
                                                                                        {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g || '-'}</option>)}
                                                                                    </select>
                                                                                </div>
                                                                                <div className="flex items-center gap-1">
                                                                                    <span className="text-xs">2do:</span>
                                                                                    <select
                                                                                        value={editGrades.grade2}
                                                                                        onChange={(e) => setEditGrades({ ...editGrades, grade2: e.target.value })}
                                                                                        className={selectClass}
                                                                                    >
                                                                                        {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g || '-'}</option>)}
                                                                                    </select>
                                                                                </div>
                                                                                <div className="flex items-center gap-1">
                                                                                    <span className="text-xs">3er:</span>
                                                                                    <select
                                                                                        value={editGrades.grade3}
                                                                                        onChange={(e) => setEditGrades({ ...editGrades, grade3: e.target.value })}
                                                                                        className={selectClass}
                                                                                    >
                                                                                        {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g || '-'}</option>)}
                                                                                    </select>
                                                                                </div>
                                                                                <div className="flex items-center gap-1">
                                                                                    <span className="text-xs">Final:</span>
                                                                                    <select
                                                                                        value={editGrades.gradeFinal}
                                                                                        onChange={(e) => setEditGrades({ ...editGrades, gradeFinal: e.target.value })}
                                                                                        className={selectClass}
                                                                                    >
                                                                                        {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g || '-'}</option>)}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <span className="font-medium text-blue-700">
                                                                                {formatGrades(enrollment)}
                                                                            </span>
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {editingEnrollment === enrollment.id ? (
                                                                            <div className="flex gap-1">
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="default"
                                                                                    onClick={() => handleSaveGrades(enrollment.id)}
                                                                                    disabled={saving}
                                                                                >
                                                                                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                                                                </Button>
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="outline"
                                                                                    onClick={handleCancelEdit}
                                                                                >
                                                                                    <X className="h-4 w-4" />
                                                                                </Button>

                                                                            </div>
                                                                        ) : (
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                onClick={() => handleEditClick(enrollment)}
                                                                            >
                                                                                <Edit2 className="h-4 w-4" />
                                                                            </Button>
                                                                        )}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                                                    No hay materias inscritas.
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Eliminar Estudiante</h3>
                        <p className="text-gray-600 mb-6">
                            ¿Está seguro que desea eliminar el estudiante <strong>{deleteConfirm.nombre}</strong> de la base de datos?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteConfirm(null)}
                                disabled={deleting}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleConfirmDelete}
                                disabled={deleting}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                Eliminar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
