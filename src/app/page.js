'use client'
import ListBox from "@/components/ListBox";
import SimpleBox from "@/components/SimpleBox";
import { useState, useEffect } from "react";
import { api } from "@/services/api";

export default function Home() {
  const [stats, setStats] = useState({ totalStudents: 0, totalTeachers: 0, lastStudent: null });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await api.getStats();
      const allStudents = await api.getAllStudents();
      setStats(data);
      setStudents(allStudents.slice(0, 5)); // Show recent 5
    }
    loadData();
  }, []);

  return (
    <div>
      <div className="flex flex-row ml-60 mt-30 gap-20">
        <SimpleBox mainText={stats.totalStudents} subTitle={"Estudiantes totales"} />
        <SimpleBox mainText={stats.totalTeachers} subTitle={"Profesores totales"} />
      </div>

      <div className="flex flex-row ml-61 mt-20 justify-self-center">
        <ListBox
          mainText={"Estudiantes Recientes"}
          headers={["Nombre", "Cédula", "Registro"]}
          data={students}
          renderRow={(student) => (
            <div className="grid grid-cols-3 gap-10 px-4">
              <h3>{student.nombre}</h3>
              <h3>{student.cedula}</h3>
              <h3>{student.registro}</h3>
            </div>
          )}
        />
      </div>
    </div>
  );
}
