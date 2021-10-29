import React, { useState, useContext } from 'react';
import ExpensesContext from '../context/ExpensesContext';

const ComprobanteAddForm = () => {

    const [folio, setFolio] = useState('001');
    const [fechaAplicacion, setFechaAplicacion] = useState('21-Ago');
    const [concepto, setConcepto] = useState('ALIMENTOS');
    const [fechaComprobante, setFechaComprobante] = useState('22-Ago');
    const [importe, setImporte] = useState('100');
    const [subTotal, setSubtotal] = useState('84');
    const [iva, setIva] = useState('16');

    const { dispatch } = useContext(ExpensesContext);

    const addComprobante = (e) => {
        e.preventDefault();
        const action = {
            type: 'ADD_COMPROBANTE',
            folio,
            fecha_aplicacion: fechaAplicacion,
            concepto,
            fecha_comprobante: fechaComprobante,
            importe,
            subtotal: subTotal,
            iva
        }

        dispatch(action)
    }
    return (

        <div>
            <p>Agregar comprobante</p>
            <form onSubmit={addComprobante} className="gridcontent">
                <div><input type="text" onChange={e => setFolio(e.target.value)} placeholder="folio.." defaultValue="001"></input></div>
                <div><input type="date" onChange={e => setFechaAplicacion(e.target.value)} placeholder="Fecha aplicacion.." defaultValue="21-Ago"></input></div>
                <div><input type="text" onChange={e => setConcepto(e.target.value)} placeholder="Concepto.." defaultValue=""></input></div>
                <div><input type="date" onChange={e => setFechaComprobante(e.target.value)} placeholder="Fecha comprobante.." defaultValue="22-Ago"></input></div>
                <div><input type="text" onChange={e => setImporte(e.target.value)} placeholder="Importe.." defaultValue=""></input></div>
                <div><input type="text" onChange={e => setSubtotal(e.target.value)} placeholder="Subtotal.." defaultValue=""></input></div>
                <div><input type="text" onChange={e => setIva(e.target.value)} placeholder="IVA.." defaultValue=""></input></div>
                <button>Add</button>
            </form>

        </div>
    );
}

export { ComprobanteAddForm as default };
