import React, { useEffect, useReducer } from 'react';

import ComprobantesLista from './ComprobantesLista';

import comprobantesReducer from '../reducers/comprobantes';
import ComprobanteAddForm from './ComprobanteAddForm';

import ComprobantesContext from '../context/comprobantesContext';

const Comprobantes = () => {

    const [comprobantes, dispatch] = useReducer(comprobantesReducer, []);

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

    return (

        <ComprobantesContext.Provider value={{ comprobantes, dispatch }}>

            <div className="comprobantes-header gridcontent">
                <p>Folio</p>
                <p>Fecha Aplicación</p>
                <p>Concepto</p>
                <p>Fecha Comprobante</p>
                <p>Importe</p>
                <p>Subototal</p>
                <p>IVA</p>
            </div>

            <ComprobantesLista />
            <ComprobanteAddForm />

        </ComprobantesContext.Provider>
    );
}

export default Comprobantes;
