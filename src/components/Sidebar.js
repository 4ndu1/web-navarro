import Link from "next/link";

export function Sidebar(){

    return (
      <nav className="flex flex-col justify-start w-80 h-screen bg-[#0c0e31] shadow-xl p-3 text-white">
        <div className="flex flex-row">
          <img></img>

          <div className="">
            <h1 className="text-[20px] block">Complejo Educativo</h1>
            <h2 className="text-[15px] block">Nicolas Eugenio Navarro</h2>
          </div>
        </div>

        <div className="mt-12 text-[20px]">
            <div className="flex flex-row m-1 
                hover:bg-[#1A1C4A] hover:cursor-pointer rounded-xl p-3">
              <img src="/material_src/home_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" className="mr-6"></img>
              <Link href={"/"}>Inicio</Link>
            </div>

            <div className="flex flex-row m-1 
                hover:bg-[#1A1C4A] hover:cursor-pointer rounded-xl p-3">
                <img src="/material_src/add_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" className="mr-6"></img>
                <Link href={"/agregar_estudiante"}>Agregar estudiante</Link>
            </div>

            <div className="flex flex-row m-1 
                hover:bg-[#1A1C4A] hover:cursor-pointer rounded-xl p-3">
              <img src="/material_src/person_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" className="mr-6"></img>
              <Link href={"/estudiantes"}>Estudiantes</Link>
            </div>

            <div className="flex flex-row m-1 
                hover:bg-[#1A1C4A] hover:cursor-pointer rounded-xl p-3">
              <img src="/material_src/person_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" className="mr-6"></img>
              <Link href={"/profesores"}>Profesores</Link>
              
            </div>
            <hr className="justify-self-center w-30 mt-3"/>
        </div>
        
      </nav>
    );
}
