'use client';
import { useState, useEffect } from 'react';
import { api } from "@/services/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronRight, Users, Loader2, GraduationCap } from "lucide-react";

export default function PageSections() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedSection, setExpandedSection] = useState(null);
    const [sectionStudents, setSectionStudents] = useState({});
    const [loadingStudents, setLoadingStudents] = useState(null);

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

    const handleToggleSection = async (sectionId) => {
        if (expandedSection === sectionId) {
            setExpandedSection(null);
            return;
        }

        setExpandedSection(sectionId);

        // If students not loaded for this section, fetch them
        if (!sectionStudents[sectionId]) {
            setLoadingStudents(sectionId);
            try {
                const students = await api.getSectionStudents(sectionId);
                setSectionStudents(prev => ({
                    ...prev,
                    [sectionId]: students
                }));
            } catch (error) {
                console.error("Error fetching section students:", error);
            } finally {
                setLoadingStudents(null);
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Secciones / Grupos Estables" />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto space-y-4">
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            </div>
                        ) : (
                            sections.map((section) => (
                                <Card key={section.id} className="overflow-hidden">
                                    <CardHeader
                                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => handleToggleSection(section.id)}
                                    >
                                        <CardTitle className="text-lg flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {expandedSection === section.id ? (
                                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5 text-gray-500" />
                                                )}
                                                <span>{section.nombre}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    <GraduationCap className="h-3 w-3" />
                                                    {section.teacher?.nombre || 'Sin profesor'}
                                                </Badge>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>

                                    {expandedSection === section.id && (
                                        <CardContent className="pt-0 border-t">
                                            <div className="py-4">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Users className="h-5 w-5 text-gray-500" />
                                                    <h4 className="font-medium">Estudiantes Inscritos</h4>
                                                </div>

                                                {loadingStudents === section.id ? (
                                                    <div className="flex justify-center py-6">
                                                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                                                    </div>
                                                ) : sectionStudents[section.id]?.length > 0 ? (
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Nombre</TableHead>
                                                                <TableHead>Cédula</TableHead>
                                                                <TableHead>1er Lapso</TableHead>
                                                                <TableHead>2do Lapso</TableHead>
                                                                <TableHead>3er Lapso</TableHead>
                                                                <TableHead>Final</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {sectionStudents[section.id].map((student, idx) => (
                                                                <TableRow key={idx}>
                                                                    <TableCell className="font-medium">{student.nombre}</TableCell>
                                                                    <TableCell>{student.cedula}</TableCell>
                                                                    <TableCell>
                                                                        <Badge variant="outline">{student.grade1 || '-'}</Badge>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Badge variant="outline">{student.grade2 || '-'}</Badge>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Badge variant="outline">{student.grade3 || '-'}</Badge>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Badge>{student.gradeFinal || '-'}</Badge>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                ) : (
                                                    <p className="text-center text-muted-foreground py-6">
                                                        No hay estudiantes inscritos en este grupo.
                                                    </p>
                                                )}
                                            </div>
                                        </CardContent>
                                    )}
                                </Card>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
