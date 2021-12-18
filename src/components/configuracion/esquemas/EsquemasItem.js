import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExpensesContext from '../../../context/ExpensesContext';

const EsquemasItem = ( { esquema } ) => {

    const { dispatchEsquemas } = useContext(ExpensesContext);

    const onEliminar = (e) => {
        e.preventDefault();

        dispatchEsquemas({
            type: 'REMOVE_ESQUEMA',
            _id: esquema._id
        })
    }
    return (
        <Link to={`/esquemasedit/${esquema._id}`}>
                <div className="gridflex">
                    <p><button onClick={onEliminar}>x</button></p>
                    <p>{esquema.descripcion}</p>
                    <p>{esquema.empresa[1]}</p>
                </div>
        </Link>

    );
}


export { EsquemasItem as default };