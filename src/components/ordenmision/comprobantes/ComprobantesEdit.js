import React, { useContext } from "react";
import ExpensesContext from '../../../context/ExpensesContext';
import ComprobantesForm from "./ComprobantesForm";

const ComprobantesEdit = ( { comprobante, setEditar } ) => {

    const { dispatchComprobantes } = useContext(ExpensesContext);
    
    const onSubmit = (data) =>{

        dispatchComprobantes( {
            type: 'EDIT_COMPROBANTE',
            _id: comprobante._id,
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
            <ComprobantesForm comprobante={comprobante} onSubmit={onSubmit} />
            <button onClick={onCancelar}>Cancelar</button>
            
        </div>
    );
}

export { ComprobantesEdit as default };