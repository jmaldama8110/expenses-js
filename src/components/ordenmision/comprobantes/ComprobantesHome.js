import React, {useState } from "react";
import ComprobantesLista from "./ComprobantesLista";
import ComprobantesAdd from "./ComprobantesAdd";

const ComprobantesHome = () => {

    const [registrar, setRegistrar] = useState(false);

    const onRegistrar = (e) => {
        e.preventDefault();
        setRegistrar( !registrar );
    }
    
    return (
        <div>
            <h3>Comprobantes</h3>
            <ComprobantesLista />
            <button onClick={onRegistrar}>+</button>
            {registrar && <ComprobantesAdd />}
        </div>
    );
}

export { ComprobantesHome as default };