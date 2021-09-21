import React from "react";
import Costokm from "./Costokm";
import Empleados from "./Empleados";
import Empresas from "./Empresas";
import Esquemas from "./Esquemas";
import Pago from "./Pago";
import Usuarios from "./Usuarios";

const ConfiguracionHome = ()=> {

    return(
        <div>
            <h1>Configuracion</h1>
            <p>Fugiat sint voluptate commodo tempor incididunt eu amet voluptate. Do consequat veniam consequat nisi eu elit aliquip duis occaecat qui. Lorem labore sunt proident esse duis. Dolore ad qui deserunt dolore adipisicing veniam dolore officia excepteur irure minim nulla aliquip eu. Qui dolore sit ex laborum commodo in amet consequat pariatur nisi consectetur aliquip incididunt.
                Nostrud eu eiusmod sit deserunt anim sit cillum eu veniam ad cillum ad. Amet nisi adipisicing ad eu qui eu adipisicing nisi. Nostrud enim Lorem ea ex laboris. </p>
            <Empresas />
            <Empleados />
            <Usuarios />
            <Pago />
            <Esquemas />
            <Costokm />
        </div>
    );
}

export { ConfiguracionHome as default };