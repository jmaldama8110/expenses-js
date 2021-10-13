import React from "react";

const Empleados = () => {

    const empleados = [
        { id: 1, usuario: "jlopez@gmail.com", nombre: "JUAN", apellidos: "LOPEZ", centrocosto: "1000" },
        { id: 2, usuario: "mramirez@gmail.com", nombre: "MARCO", apellidos: "RAMIREZ", centrocosto: "1004" },
        { id: 3, usuario: "agonzalez@gmail.com", nombre: "ANA", apellidos: "GONZALEZ", centrocosto: "1000" },
    ]
    return (
        <div>
            <h2>Empleados</h2>
            <p> Qui ex occaecat elit incididunt ea velit sunt.Laborum proident anim qui ea ex excepteur adipisicing adipisicing tempor commodo aliquip proident aute. Dolore enim enim consectetur incididunt eu magna veniam fugiat nulla anim.Lorem ad aliquip cillum minim sint amet ad ad commodo in.Ad officia laboris ex amet.</p>
            <div className="tableheader">
                <p>Usuario</p>
                <p>Nombre</p>
                <p>Centro Costo</p>
                <p>Accion</p>
            </div>
            {empleados.map(item => {
                return <div className="tablerow" key={item.id}>
                    <p>{item.usuario}</p>
                    <p>{item.nombre +' '+item.apellidos}</p>
                    <p>{item.centrocosto}</p>
                    <a href="#home">Modificar</a>
                </div>

            })}
        </div>

    );
}

export { Empleados as default };