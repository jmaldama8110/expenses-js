import React, { useContext } from "react";
import ExpensesContext from '../../../context/ExpensesContext';
import VariosGastosForm from "./VariosGastosForm";

const VariosGastosEdit = ( { vario_gasto, setEditar } ) => {

    const { dispatchVariosGastos } = useContext(ExpensesContext);
    
    const onSubmit = (data) =>{

        dispatchVariosGastos( {
            type: 'EDIT_VARIOS_GASTOS',
            _id: vario_gasto._id,
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
            <VariosGastosForm vario_gasto={vario_gasto} onSubmit={onSubmit} />
            <button onClick={onCancelar}>Cancelar</button>
            
        </div>
    );
}

export { VariosGastosEdit as default };