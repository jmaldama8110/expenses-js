import React, { useContext, useState } from "react";
import ExpensesContext from '../../../context/ExpensesContext';

import ComprobantesEdit from './ComprobantesEdit';

const ComprobantesItem = ( {item}) => {
    
    const { dispatchComprobantes } = useContext(ExpensesContext);
    const [editar, setEditar] = useState(false);

    const onEliminar = (e) => {
        e.preventDefault();
        dispatchComprobantes({
            type: 'REMOVE_COMPROBANTE',
            _id: item._id
        })
    }
    

    const toggleEdit = (e)=> {
        e.preventDefault();
        setEditar( !editar );
    }
    return  (
    <div>
        <p>
            <button onClick={onEliminar}>x</button>
            <button onClick={toggleEdit}>?</button>
            {item.tipo} {item.importe} {item.concepto}
        </p>
        {editar && <ComprobantesEdit comprobante={item} setEditar={setEditar} />}
    </div>

    );
}

export { ComprobantesItem as default };