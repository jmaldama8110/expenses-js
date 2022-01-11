import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import VariosGastosForm from "./VariosGastosForm";

const VariosGastosAdd = () => {

    const { dispatchVariosGastos } = useContext(ExpensesContext);
    
    const onSubmit = (data) =>{
        dispatchVariosGastos( {
            type: 'ADD_VARIOS_GASTOS',
            ...data
        });

    }

    return (
        <div>
            <VariosGastosForm onSubmit={onSubmit} />
        </div>
    );
}

export { VariosGastosAdd as default };