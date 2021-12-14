import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import ComprobantesForm from "./ComprobantesForm";

const ComprobantesAdd = () => {

    const { dispatchComprobantes } = useContext(ExpensesContext);
    
    const onSubmit = (data) =>{
        dispatchComprobantes( {
            type: 'ADD_COMPROBANTE',
            ...data
        });

    }

    return (
        <div>
            <ComprobantesForm onSubmit={onSubmit} />
        </div>
    );
}

export { ComprobantesAdd as default };