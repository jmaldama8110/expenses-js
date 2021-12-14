import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExpensesContext from "../../../../context/ExpensesContext";

const PuestosItem = ({puesto}) => {

    const { dispatchPuestos } = useContext(ExpensesContext);

    const onEliminar = (e) => {
        e.preventDefault();

        dispatchPuestos({
            type: 'REMOVE_PUESTO',
            _id: puesto._id
        })
    }
    return (
        <Link to={`/puestosedit/${puesto._id}`}>
                <div className="gridflex">
                    <p><button onClick={onEliminar}>x</button></p>
                    <p>{puesto.id}</p>
                    <p>{puesto.titulo}</p>
                    <p>{puesto.parent[1]}</p>
                    <p>{puesto.depto[1]}</p>
                </div>
        </Link>

    );
}

export { PuestosItem as default };