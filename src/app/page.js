'use client'
import ListBox from "@/components/ListBox";
import SimpleBox from "@/components/SimpleBox";
import { useState } from "react";

//pagina principal
export default function Home() {

  const [registros, setRegistros] = useState([
    { id: 1, Nombre: "Luis Gonzalez", Cedula: "101", Registro: "2023/01/01" },
    { id: 2, Nombre: "Elena", Cedula: "202", Registro: "2023/01/05" },
  ]);

  function handleNuevoRegistro(){

    const nuevoRegistro = {
      id: Date.now(),
      Nombre: "Nuevo Nombre",
      Cedula: "31.713.516",
      Registro: new Date().toLocaleDateString()
    };

    setRegistros([...registros, nuevoRegistro])

  }

  return (
    <div>
      <div className="flex flex-row ml-60 mt-30">
        <div className="flex flex-row space-x-20">
          <SimpleBox mainText={"800"} subTitle={"Estudiantes totales"} />
          <SimpleBox mainText={"Luis Gonzalez"} subTitle={"Ultimo Registro"} />
        </div>
      </div>
      <button onClick={handleNuevoRegistro}>Nuevo registro</button>
      <div className="flex flex-row ml-61 mt-20 justify-self-center">
        <ListBox mainText={"Ultimos Registros"} datos={registros} />
      </div>
    </div>

  );
}
