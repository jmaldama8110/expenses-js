import React, { useContext } from 'react';

import ExpensesContext from '../../../context/ExpensesContext';

const CentroCostoItem = ({item}) => {

    const { dispatchCentroCosto } = useContext(ExpensesContext);

    const onEliminar = (e) => {
        e.preventDefault();

        dispatchCentroCosto({
            type: 'REMOVE_CC',
            id: item.id
        })
    }
    return (
            <div className="gridflex">
                <p><button onClick={onEliminar}>x</button></p>
                <p>{item.codigo}</p>
                <p>{item.nombre}</p>
            </div>

    );
}


export { CentroCostoItem as default };