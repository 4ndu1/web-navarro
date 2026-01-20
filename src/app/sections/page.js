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
import { cn } from "@/lib/utils";

// Same function as in agregar_estudiante
const generateSchoolYears = () => {
    const years = [];
    const startYear = 2020;
    for (let i = 0; i < 15; i++) {
        const year = startYear + i;
        years.push(`${year}-${year + 1}`);
    }
    return years;
};

const SCHOOL_YEARS = generateSchoolYears();

export default function PageSections() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState("2024-2025");
    const [expandedSection, setExpandedSection] = useState(null);
    const [sectionStudents, setSectionStudents] = useState({});
    const [loadingStudents, setLoadingStudents] = useState(null);

    useEffect(() => {
        const fetchSections = async () => {
            setLoading(true);
            try {
                const data = await api.getSections();
                setSections(data);
                // Reset states when year changes if needed, but here we just fetch section names once
            } catch (error) {
                console.error("Error fetching sections:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSections();
    }, []);

    // When year changes, reset expanded and students
    useEffect(() => {
        setExpandedSection(null);
        setSectionStudents({});
    }, [selectedYear]);

    const handleToggleSection = async (sectionId) => {
        if (expandedSection === sectionId) {
            setExpandedSection(null);
            return;
        }

        setExpandedSection(sectionId);

        // Fetch students for this section AND selected year
        if (!sectionStudents[sectionId]) {
            setLoadingStudents(sectionId);
            try {
                const students = await api.getSectionStudents(sectionId, selectedYear);
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

                {/* School Year Tabs */}
                <div className="bg-white border-b overflow-x-auto">
                    <div className="flex px-6 space-x-6">
                        {SCHOOL_YEARS.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={cn(
                                    "py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                                    selectedYear === year
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                )}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Año Escolar: {selectedYear}</h2>
                        </div>

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
                                                    <h4 className="font-medium">Estudiantes Inscritos en {selectedYear}</h4>
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
                                                        No hay estudiantes inscritos en este grupo para el año {selectedYear}.
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
