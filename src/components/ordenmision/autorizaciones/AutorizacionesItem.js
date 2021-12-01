import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";


const AutorizacionesItem = ( {item}) => {
    
    const { dispatchAutorizaciones } = useContext(ExpensesContext);

    const onAutorizar = (e) => {
        e.preventDefault();

        const edit_object = {
            estatus: ['A','Autorizado']
        }
        dispatchAutorizaciones({
            type: 'EDIT_AUTORIZACION',
            _id: item._id,
            edit_object
        });
    }

    return  (
    <div>
        <label>{item.nombre_autorizador} ({item.estatus[1]})</label> 
        { item.estatus[0] === 'P' && <button onClick={onAutorizar}>+</button>}
 
    </div>

    );
}

export { AutorizacionesItem as default };