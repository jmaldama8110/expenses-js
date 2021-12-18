import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";


const AutorizacionesItem = ({ item }) => {

    const { dispatchAutorizaciones, usuarioInfo } = useContext(ExpensesContext);

    const onAutorizar = (e) => {
        e.preventDefault();

        if (window.confirm('¿Autorizar esta Orden de Mision?')) {

            const edit_object = {
                estatus: ['A', 'Autorizado']
            }
            dispatchAutorizaciones({
                type: 'EDIT_AUTORIZACION',
                _id: item._id,
                edit_object
            });

            
        }
    }

    return (
        <div>
            <label>{item.nombre_autorizador} ({item.estatus[1]})</label>
            {item.estatus[0] === 'P' &&
                usuarioInfo._id === item.usuario_id &&
                <button onClick={onAutorizar}>+</button>
            }

        </div>

    );
}

export { AutorizacionesItem as default };