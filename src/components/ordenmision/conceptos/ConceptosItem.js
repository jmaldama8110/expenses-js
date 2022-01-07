import React, { useContext, useState } from "react";
import ExpensesContext from '../../../context/ExpensesContext';
import { formatoPesos } from '../../../utils/numberFormatter';

import ConceptosEdit from './ConceptosEdit';

const ConceptosItem = ({ item }) => {

    const { estatusId, dispatchConceptos } = useContext(ExpensesContext);
    const [editar, setEditar] = useState(false);

    const onEliminar = (e) => {
        e.preventDefault();
        dispatchConceptos({
            type: 'REMOVE_CONCEPTO',
            _id: item._id
        })
    }


    const toggleEdit = (e) => {
        e.preventDefault();
        setEditar(!editar);
    }
    return (
        <li>
            {estatusId === 'P' && <button onClick={onEliminar}>x</button>}
            {estatusId === 'P' && <button onClick={toggleEdit}>?</button>}
            {item.tipo_concepto[1]} {formatoPesos(parseFloat(item.tope_importe))}

            {editar && <ConceptosEdit concepto={item} setEditar={setEditar} />}
        </li>

    );
}

export { ConceptosItem as default };