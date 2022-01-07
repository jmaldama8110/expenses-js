import React, { useContext } from 'react';

import ExpensesContext from '../../../context/ExpensesContext';

const VariosItem = ({ item }) => {

    const { dispatchVarios } = useContext(ExpensesContext);

    const onEliminar = (e) => {
        e.preventDefault();

        dispatchVarios({
            type: 'REMOVE_VARIOS',
            _id: item._id
        })
    }
    return (
        <div className="gridflex">
            <p><button onClick={onEliminar}>x</button></p>
            <p>{item.descripcion}</p>
            <p>{item.cuenta} {item.subcuenta}</p>
            <p>{item.empresa[1]}</p>
        </div>

    );
}


export { VariosItem as default };