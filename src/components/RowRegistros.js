function RowRegistros({Nombre, Cedula, Registro}) {
    return (  
        <div className="grid grid-cols-3 gap-10">
            <h3>{Nombre}</h3>
            <h3>{Cedula}</h3>
            <h3>{Registro}</h3>
        </div>
    );
}

export default RowRegistros;