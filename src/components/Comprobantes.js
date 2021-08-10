import React, { useState, useEffect, useReducer } from 'react';

import Comprobante from './Comprobante';

import comprobantesReducer from '../reducers/comprobantes';

const Comprobantes = () => {

    const [comprobantes, dispatch] = useReducer(comprobantesReducer, []);

    const [folio, setFolio] = useState('001');
    const [fechaAplicacion, setFechaAplicacion] = useState('21-Ago');
    const [concepto, setConcepto] = useState('ALIMENTOS');
    const [fechaComprobante, setFechaComprobante] = useState('22-Ago');
    const [importe, setImporte] = useState('100');
    const [subTotal, setSubtotal] = useState('84');
    const [iva, setIva] = useState('16');


    useEffect(() => {
        const comprobantesData = JSON.parse(localStorage.getItem('comprobantes'))
    
        if (comprobantesData) {
            dispatch({
                type: 'POPULATE_COMPROBANTES',
                comprobantes: comprobantesData
            })
        }




    }, [])

    useEffect(() => {
        localStorage.setItem('comprobantes', JSON.stringify(comprobantes))
    }, [comprobantes])

    const removeComprobante = (folio) => {
        dispatch({
            type: 'REMOVE_COMPROBANTE',
            folio
        })
    }

    const addComprobante = () => {

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
            <h1>Comprobantes</h1>
            {
                comprobantes.map(comprobante => (
                    <Comprobante key={comprobante.folio} comprobante={comprobante} removeComprobante={removeComprobante} />

                ))
            }
            <p>Agregar comprobante</p>
            <form className="gridcontent">
                <div><input type="text" onChange={e => setFolio(e.target.value)} placeholder="folio.." defaultValue="001"></input></div>
                <div><input type="text" onChange={e => setFechaAplicacion(e.target.value)} placeholder="Fecha aplicacion.." defaultValue="21-Ago"></input></div>
                <div><input type="text" onChange={e => setConcepto(e.target.value)} placeholder="Concepto.." defaultValue=""></input></div>
                <div><input type="text" onChange={e => setFechaComprobante(e.target.value)} placeholder="Fecha comprobante.." defaultValue="22-Ago"></input></div>
                <div><input type="text" onChange={e => setImporte(e.target.value)} placeholder="Importe.." defaultValue=""></input></div>
                <div><input type="text" onChange={e => setSubtotal(e.target.value)} placeholder="Subtotal.." defaultValue=""></input></div>
                <div><input type="text" onChange={e => setIva(e.target.value)} placeholder="IVA.." defaultValue=""></input></div>
            </form>
            <button onClick={addComprobante}>Add</button>
        </div>
    );
}

export default Comprobantes;
