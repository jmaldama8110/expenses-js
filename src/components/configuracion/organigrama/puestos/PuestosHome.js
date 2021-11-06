import React, { useReducer, useEffect } from 'react';
import PuestosLista from './PuestosLista';

import { Link } from 'react-router-dom';

import ExpensesContext from '../../../../context/ExpensesContext';
import PuestosReducer from '../../../../reducers/puestos';

const PuestosHome = ()=>{


    const [puestos, dispatchPuestos]  = useReducer(PuestosReducer, []);

    useEffect( ()=>{
    
        const lsPuestos = JSON.parse( localStorage.getItem("puestos") );
      
        if( lsPuestos ) {
            dispatchPuestos( {
                type: "POPULATE_PUESTOS",
                puestos: lsPuestos
            })
        }

    },[]);

    useEffect( ()=>{
        localStorage.setItem('puestos', JSON.stringify( puestos ) );
    },[puestos])


    return (
        <div>
            <h1>Puestos</h1>
            <Link to="/puestosadd">Agregar</Link>
            <ExpensesContext.Provider value={ { puestos,
                                                dispatchPuestos }}>
                <PuestosLista />
            </ExpensesContext.Provider>
        </div>
    );
}

export default PuestosHome;