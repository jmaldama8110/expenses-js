import React, { useContext, useState } from "react";
import ExpensesContext from '../../../context/ExpensesContext';

import VariosGastosEdit from './VariosGastosEdit';
import { formatoPesos } from '../../../utils/numberFormatter';

const VariosGastosItem = ({ item }) => {

    const { dispatchVariosGastos, estatusId } = useContext(ExpensesContext);
    const [editar, setEditar] = useState(false);

    const onEliminar = (e) => {
        e.preventDefault();
        dispatchVariosGastos({
            type: 'REMOVE_VARIOS_GASTOS',
            _id: item._id
        })
    }


    const toggleEdit = (e) => {
        e.preventDefault();
        setEditar(!editar);
    }
    return (
        <li>

            { (estatusId === 'P' || estatusId ==='A') && <button onClick={onEliminar}>x</button>}
            { (estatusId === 'P' || estatusId ==='A') && <button onClick={toggleEdit}>?</button>}
            {item.descripcion} { formatoPesos( parseFloat(item.importe) ) } {item.concepto}

            {editar && <VariosGastosEdit vario_gasto={item} setEditar={setEditar} />}
        </li>

    );
}

export { VariosGastosItem as default };