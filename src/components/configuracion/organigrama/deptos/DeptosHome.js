import React, { useReducer, useEffect } from 'react';
import DeptosLista from './DeptosLista';

import { Link } from 'react-router-dom';

import ExpensesContext from '../../../../context/ExpensesContext';
import DeptosReducer from "../../../../reducers/deptos";

const DeptosHome = ()=>{


    const [deptos, dispatchDeptos]  = useReducer(DeptosReducer, []);

    useEffect( ()=>{
    
        const localData = JSON.parse( localStorage.getItem("deptos") );
      
        if( localData ) {
            dispatchDeptos( {
                type: "POPULATE_DEPTOS",
                deptos: localData
            })
        }

    },[]);

    // useEffect( ()=>{
    //     localStorage.setItem('deptos', JSON.stringify( deptos ) );
    // },[deptos])


    return (
        <div>
            <h1>Departamentos</h1>
            <Link to="/deptosadd">Agregar</Link>
            <ExpensesContext.Provider value={ { deptos,
                                                dispatchDeptos }}>
                <DeptosLista />
            </ExpensesContext.Provider>
        </div>
    );
}

export default DeptosHome;