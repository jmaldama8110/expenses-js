import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExpensesContext from '../../../context/ExpensesContext';

const EmpresasItem = ({empresa}) => {

    const { dispatchEmpresas } = useContext(ExpensesContext);

    const onEliminar = (e) => {
        e.preventDefault();

        dispatchEmpresas({
            type: 'REMOVE_EMPRESA',
            id: empresa.id
        })
    }
    return (
        <Link to={`/empresasedit/${empresa._id}`}>
                <div className="gridflex">
                    <p><button onClick={onEliminar}>x</button></p>
                    <p>{empresa.nombre}</p>
                </div>
        </Link>

    );
}

export { EmpresasItem as default };