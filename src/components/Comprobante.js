import React,{useContext} from 'react';

import ExpensesContext from '../context/ExpensesContext';


const Comprobante = ({ comprobante }) => {
    const { dispatch } = useContext(ExpensesContext);

    const removeComprobante = (folio) => {
        dispatch({
            type: 'REMOVE_COMPROBANTE',
            folio
        })
    }

    return (
        <div>
            <div className="comprobantes-item gridcontent">
                <p>{comprobante.folio}</p>
                <input type="date" disabled defaultValue={comprobante.fecha_aplicacion}></input>
                <p>{comprobante.concepto}</p>
                <input type="date" disabled defaultValue={comprobante.fecha_comprobante}></input>
                <p>{comprobante.importe}</p>
                <p>{comprobante.subtotal}</p>
                <p>{comprobante.iva}</p>
                <button onClick={() => removeComprobante(comprobante.folio)}>X</button>
            </div>
        </div>
    );
}



export default Comprobante;
