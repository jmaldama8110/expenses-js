import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExpensesContext from '../../../context/ExpensesContext';

const BancosItem = ({banco}) => {

    const { dispatchBancos } = useContext(ExpensesContext);

    const onEliminar = (e) => {
        e.preventDefault();

        dispatchBancos({
            type: 'REMOVE_BANCO',
            _id: banco._id
        })
    }
    return (
        <Link to={`/bancosedit/${banco._id}`}>
                <div className="gridflex">
                    <p><button onClick={onEliminar}>x</button></p>
                    <p>{banco.numero_cuenta}</p>
                    <p>{banco.clabe}</p>
                    <p>{banco.banco[1]}({banco.banco[0]})</p>
                </div>
        </Link>

    );
}

export { BancosItem as default };