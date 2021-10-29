import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExpensesContext from '../../../context/ExpensesContext';

const UsuariosItem = ({usuario}) => {

    const { dispatchUsuarios } = useContext(ExpensesContext);

    const onEliminar = (e) => {
        e.preventDefault();

        dispatchUsuarios({
            type: 'REMOVE_USUARIO',
            id: usuario.id
        })
    }
    return (
        <Link to={`/usuariosedit/${usuario.id}`}>
                <div className="gridflex">
                    <p><button onClick={onEliminar}>x</button></p>
                    <p>{usuario.id}</p>
                    <p>{usuario.nombre}</p>
                    <p>{usuario.email}</p>
                </div>
        </Link>

    );
}


export { UsuariosItem as default };