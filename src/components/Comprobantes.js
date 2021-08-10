import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import Comprobante from './Comprobante';

import comprobantesReducer from '../reducers/comprobantes';

const Comprobantes = () => {

    const [comprobantes, dispatch] = useReducer(comprobantesReducer, []);

    const [folio, setFolio] = useState('');
    const [fechaAplicacion, setFechaAplicacion] = useState('');
    const [concepto, setConcepto] = useState('');
    const [fechaComprobante, setFechaComprobante] = useState('');
    const [importe, setImporte] = useState('');
    const [subTotal, setSubtotal] = useState('');
    const [iva, setIva] = useState('');


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

    const onRemoveComprobante = (folio) => {
        dispatch({
            type: 'REMOVE_COMPROBANTE',
            folio
        })
    }

    const addComprobante = () => {
        dispatch({
            type: 'ADD_COMPROBANTE',
            folio,
            fechaAplicacion,
            concepto,
            fechaComprobante,
            importe,
            subTotal,
            iva
        })
    }

    return (

        <div>
            <h1>Comprobantes</h1>
            {
                comprobantes.map(comprobante => (
                    <Comprobante key={comprobante.folio} comprobante={comprobante} removeComprobante={onRemoveComprobante} />

                ))
            }
            <p>Agregar comprobante</p>
            <form onSubmit={addComprobante}>
                <div><input type="text" onChange={setFolio} placeholder="folio.." defaultValue="001"></input></div>
                <div><input type="text" onChange={setFechaAplicacion} placeholder="Fecha aplicacion.." defaultValue="21-Ago"></input></div>
                <div><input type="text" onChange={setConcepto} placeholder="Concepto.." defaultValue=""></input></div>
                <div><input type="text" onChange={setFechaComprobante} placeholder="Fecha comprobante.." defaultValue="22-Ago"></input></div>
                <div><input type="text" onChange={setImporte} placeholder="Importe.." defaultValue=""></input></div>
                <div><input type="text" onChange={setSubtotal} placeholder="Subtotal.." defaultValue=""></input></div>
                <div><input type="text" onChange={setIva} placeholder="IVA.." defaultValue=""></input></div>
            </form>
        </div>
    );
}

export default Comprobantes;
