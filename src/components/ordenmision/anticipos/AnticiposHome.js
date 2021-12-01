import React, {useState } from "react";
import AnticiposLista from "./AnticiposLista";
import AnticiposAdd from "./AnticiposAdd";
const AnticiposHome = () => {

    const [registrar, setRegistrar] = useState(false);

    const onRegistrar = (e) => {
        e.preventDefault();
        setRegistrar( !registrar );
    }
    
    return (
        <div>
            <h3>Anticipos & Reembolsos</h3>
            <AnticiposLista />
            <button onClick={onRegistrar}>+</button>
            {registrar && <AnticiposAdd />}
        </div>
    );
}

export { AnticiposHome as default };