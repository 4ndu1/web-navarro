'use client'
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import DataTable from "@/components/dashboard/DataTable";
import { Users, GraduationCap, School, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/services/api";

const studentColumns = [
  { key: "nombre", label: "Nombre" },
  { key: "cedula", label: "Cédula-ID" },
  { key: "registro", label: "Fecha Registro" },
];

export default function Home() {
  const [stats, setStats] = useState({ totalStudents: 0, totalTeachers: 0, lastStudent: null });
  const [students, setStudents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getStats();
        const allStudents = await api.getAllStudents();
        setStats(data);
        // Ensure students are sorted by ID (descending) or date to show newest first
        const sortedStudents = [...allStudents].sort((a, b) => b.id - a.id);
        setStudents(sortedStudents);

        // Generate "Recent Activity" from students
        const activities = sortedStudents.slice(0, 5).map(s => ({
          type: 'new_student',
          title: 'Nuevo estudiante',
          description: `${s.nombre} se unió al sistema`,
          time: s.registro // Simplified; ideally calculate relative time
        }));
        setRecentActivities(activities);

        // Calculate "Monthly Enrollments" from students
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const currentYear = new Date().getFullYear();

        // Initialize counts
        const monthCounts = new Array(12).fill(0);

        allStudents.forEach(student => {
          if (student.registro) {
            const date = new Date(student.registro);
            if (date.getFullYear() === currentYear) {
              monthCounts[date.getMonth()]++;
            }
          }
        });

        // Format for Chart (filtering to current month or just showing all year up to now)
        const currentMonthIndex = new Date().getMonth();
        const formattedChartData = months.slice(0, currentMonthIndex + 1).map((name, index) => ({
          name,
          students: monthCounts[index]
        }));
        setChartData(formattedChartData);

      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard Principal" />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Tarjetas de Estadísticas */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Estudiantes Totales"
              value={stats.totalStudents}
              icon={Users}
              trend="up"
              description="+12% mes anterior"
            />
            <StatCard
              title="Profesores Activos"
              value={stats.totalTeachers}
              icon={GraduationCap}
              trend="up"
              description="+2 nuevos"
            />
            <StatCard
              title="Secciones"
              value="12"
              icon={School}
              description="4 activas hoy"
            />
            <StatCard
              title="Materias"
              value="8"
              icon={BookOpen}
              description="Plan 2024"
            />
          </div>

          {/* Gráfico y Actividad */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="md:col-span-4 h-full">
              <EnrollmentChart data={chartData} />
            </div>
            <div className="md:col-span-3">
              <ActivityFeed activities={recentActivities} />
            </div>
          </div>

          {/* Tabla de Datos */}
          <DataTable
            title="Base de Datos de Estudiantes"
            columns={studentColumns}
            data={students}
            onDataChange={() => {
              api.getAllStudents().then(allStudents => {
                const sortedStudents = [...allStudents].sort((a, b) => b.id - a.id);
                setStudents(sortedStudents);
                setStats(prev => ({ ...prev, totalStudents: allStudents.length }));
              });
            }}
          />
        </main>
      </div>
    </div>
  );
}
