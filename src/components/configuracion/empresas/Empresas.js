import React from "react";
import { Link } from "react-router-dom";


const Empresas = ()=> {

    const empresas = [
        { id: 1, razon_social: "FINPRODUCTIVO SC", rfc: "FIN030414FHW", direccion: "PALMA CORZO 412, LAS PALMAS TUXTLA GUTIERREZ, CHIAPAS CP 29040", centrocosto: "2100" },
        { id: 2, razon_social: "CONSERVA AC", rfc: "CON091021HC2", direccion: "PALMA YUCA 320, LAS PALMAS TUXTLA GUTIERREZ, CHIAPAS 29040", centrocosto: "2200" },
        { id: 3, razon_social: "CONSULTORES DE SERVICIOS VARIOS SA DE CV SOFOM SC", rfc: "CSV138490HJ7", direccion: "PALMA COROZO 415, LAS PALMAS, TUXTLA GUTIERREZ, CHIAPAS CP 29040", centrocosto: "2300" },

    ]
    return (
        <div>
            <h2>Empresas registradas</h2>
            <p>Consectetur est elit Lorem commodo excepteur Lorem do non laborum eiusmod minim consequat.Voluptate mollit deserunt et proident deserunt ad reprehenderit ipsum et veniam duis ea ut nisi.Ullamco consequat anim cillum do nostrud amet incididunt aliqua.</p>
            <div className="tableheader">
                <p>Razon Social</p>
                <p>RFC</p>
                <p>Centro Costo</p>
                <p>Accion</p>
            </div>
            {empresas.map(item => {
                return <div className="tablerow" key={item.id}>
                    <p>{item.razon_social}</p>
                    <p>{item.rfc}</p>
                    <p>{item.centrocosto}</p>
                    <a href="#home">Modificar</a>
                </div>

            })}
            <Link to="/home">Regresar</Link>
        </div>

    );
}

export { Empresas as default };