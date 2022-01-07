import React, { useContext, useState } from "react";
import ExpensesContext from '../../../context/ExpensesContext';

import ComprobantesEdit from './ComprobantesEdit';
import { formatoPesos } from '../../../utils/numberFormatter';

const ComprobantesItem = ({ item }) => {

    const { dispatchComprobantes, estatusId } = useContext(ExpensesContext);
    const [editar, setEditar] = useState(false);

    const onEliminar = (e) => {
        e.preventDefault();
        dispatchComprobantes({
            type: 'REMOVE_COMPROBANTE',
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
            {item.tipo} { formatoPesos( parseFloat(item.importe) ) } {item.concepto}

            {editar && <ComprobantesEdit comprobante={item} setEditar={setEditar} />}
        </li>

    );
}

export { ComprobantesItem as default };