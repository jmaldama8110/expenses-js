import React from "react";


const Usuarios = ()=> {

    const usuarios = [
        { id: 114100, usuario: 'jlopez', estatus: 'Activo', departamento: 'Administracion y Finanzas', puesto: 'Auxiliar Contable', correo: 'jlopez@gmail.com', telefono:'9761223443'  },
        { id: 203274, usuario: 'mramirez', estatus: 'Activo', departamento: 'Tecnologias de la Informacion', puesto: 'Soporte TI', correo: 'jlopez@gmail.com', telefono:'96123334444'  },
        { id: 178378, usuario: 'agonzalez', estatus: 'Activo', departamento: 'Talento Humano', puesto: 'Capacitador Senior', correo: 'jlopez@gmail.com', telefono:'993456767'  },

    ]
    return (
        <div>
            <h2>Usuarios Registrados</h2>
            <p>Voluptate occaecat duis veniam pariatur nostrud anim cillum officia ut veniam commodo eu velit.Et labore voluptate adipisicing ipsum.Consequat adipisicing esse esse magna aliquip amet do amet proident. do nostrud amet incididunt aliqua.</p>
            <div className="tableheader">
                <p>Id</p>
                <p>Usuario</p>
                <p>Departamento</p>
                <p>Puesto</p>
                <p>Correo</p>
                <p>Accion</p>
            </div>
            {usuarios.map(item => {
                return <div className="tablerow">
                    <p>{item.id}</p>
                    <p>{item.usuario}</p>
                    <p>{item.departamento}</p>
                    <p>{item.puesto}</p>
                    <p>{item.correo}</p>
                    <a href="#">Modificar</a>
                </div>

            })}
        </div>

    );
}

export { Usuarios as default };