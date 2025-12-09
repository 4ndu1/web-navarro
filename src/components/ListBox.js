import RowRegistros from "./RowRegistros";

function ListBox({ mainText, datos }) {
    return (
        <div className="flex flex-col p-5 rounded-xl border-1 border-neutral-400 shadow-xl w-[1000px] h-[400px]">
            <div className="text-[40px] antialiased font-medium">
                {mainText}
            </div>


            <div className="flex flex-col mt-7 ">

                <div className="grid grid-cols-3 text-[#828282] gap-10 my-2">
                    <h3 className="">
                        Nombre
                    </h3>

                    <h3 className="">
                        Cédula
                    </h3>

                    <h3 className="">
                        Registro
                    </h3>
                    
                </div>

                <hr className="border-gray-300 my-2"></hr>
                
                {datos.map((registro) => (
                    <div key={registro.id}>
                        <RowRegistros
                            Nombre={registro.Nombre}
                            Cedula={registro.Cedula}
                            Registro={registro.Registro}
                        />
                        <hr className="border-gray-300 my-2"></hr>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default ListBox;