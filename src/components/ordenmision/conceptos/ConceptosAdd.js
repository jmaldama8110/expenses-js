import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import ConceptosForm from "./ConceptosForm";

const ConceptosAdd = () => {

    const { dispatchConceptos } = useContext(ExpensesContext);
    
    const onSubmit = (data) =>{
        dispatchConceptos( {
            type: 'ADD_CONCEPTO',
            ...data
        });

    }

    return (
        <div>
            <ConceptosForm onSubmit={onSubmit} />
        </div>
    );
}

export { ConceptosAdd as default };