import React, { useReducer, useEffect } from 'react';
import EmpresasLista from './EmpresasLista';

import { Link } from 'react-router-dom';

import ExpensesContext from '../../../context/ExpensesContext';
import EmpresasReducer from '../../../reducers/empresas';

const EmpresasHome = ()=>{


    const [empresas, dispatchEmpresas]  = useReducer(EmpresasReducer, []);

    useEffect( ()=>{
    
        const localData = JSON.parse( localStorage.getItem("empresas") );
      
        if( localData ) {
            dispatchEmpresas( {
                type: "POPULATE_EMPRESAS",
                deptos: localData
            })
        }

    },[]);

    return (
        <div>
            <h1>Empresas</h1>
            <Link to="/empresasadd">Agregar</Link>
            <ExpensesContext.Provider value={ { empresas,
                                                dispatchEmpresas }}>
                <EmpresasLista />
            </ExpensesContext.Provider>
            <Link to='/home'>Regresar</Link>
        </div>
    );
}

export default EmpresasHome;