import React from "react";
import AutorizacionesLista from "./AutorizacionesLista";


const AutorizacionesHome = () => {
    return (
        <div>
            <h3>Autorizaciones</h3>
            <AutorizacionesLista />
        </div>
    );
}

export { AutorizacionesHome as default };