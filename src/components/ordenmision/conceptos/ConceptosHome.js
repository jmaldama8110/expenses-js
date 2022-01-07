import React, {useContext, useState } from "react";
import ConceptosLista from "./ConceptosLista";
import ConceptosAdd from "./ConceptosAdd";
import ExpensesContext from '../../../context/ExpensesContext';

const ConceptosHome = () => {

    const [registrar, setRegistrar] = useState(false);
    const { estatusId } = useContext(ExpensesContext);

    const onRegistrar = (e) => {
        e.preventDefault();
        setRegistrar( !registrar );
    }
    
    return (
        <div>
            <h3>Tope diario por concepto permitido:</h3>
            <ConceptosLista />
            { estatusId === 'P'&& <button onClick={onRegistrar}>+</button>}
            {registrar &&  <ConceptosAdd />}
        </div>
    );
}

export { ConceptosHome as default };