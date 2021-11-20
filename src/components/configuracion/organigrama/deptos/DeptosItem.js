import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExpensesContext from "../../../../context/ExpensesContext";

const DeptosItem = ({depto}) => {

    const { dispatchDeptos } = useContext(ExpensesContext);

    const onEliminar = (e) => {
        e.preventDefault();

        dispatchDeptos({
            type: 'REMOVE_DEPTO',
            _id: depto._id
        })
    }
    return (
        <Link to={`/deptosedit/${depto._id}`}>
                <div className="gridflex">
                    <p><button onClick={onEliminar}>x</button></p>
                    <p>{depto._id}</p>
                    <p>{depto.titulo}</p>
                </div>
        </Link>

    );
}

export { DeptosItem as default };