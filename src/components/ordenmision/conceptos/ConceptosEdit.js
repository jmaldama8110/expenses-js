import React, { useContext } from "react";
import ExpensesContext from '../../../context/ExpensesContext';
import ConceptosForm from "./ConceptosForm";

const ConceptosEdit = ( { concepto, setEditar } ) => {

    const { dispatchConceptos } = useContext(ExpensesContext);
    
    const onSubmit = (data) =>{

        dispatchConceptos( {
            type: 'EDIT_CONCEPTO',
            _id: concepto._id,
            edit_object: data
        });

        setEditar(false);

    }

    const onCancelar = (e) =>{
        e.preventDefault();
       setEditar(false); 
    }

    return (
        <div>
            <ConceptosForm concepto={concepto} onSubmit={onSubmit} />
            <button onClick={onCancelar}>Cancelar</button>
            
        </div>
    );
}

export { ConceptosEdit as default };