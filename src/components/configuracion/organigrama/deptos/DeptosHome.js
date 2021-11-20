import React, { useReducer, useEffect, useState } from 'react';
import DeptosLista from './DeptosLista';
import Loader from '../../../Loader';
import { Link } from 'react-router-dom';

import ExpensesContext from '../../../../context/ExpensesContext';
import DeptosReducer from "../../../../reducers/deptos";
import { AxiosExpenseApi } from  '../../../../utils/axiosApi';


const DeptosHome = ()=>{

    const [loading, setLoading ] = useState(false);

    const [deptos, dispatchDeptos]  = useReducer(DeptosReducer, []);

    useEffect( ()=>{

        let mounted = true;

        if( mounted ){

            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            if (axiosApi ) {
                axiosApi.get('/deptos').then( (res)=>{
                    dispatchDeptos( {
                        type: "POPULATE_DEPTOS",
                        deptos: res.data
                    });
    
                }).catch( (e)=>{
                    alert(e);
                }).finally( ()=>{
                    setLoading(false);
                })
            }
                
 


        }

        return () => mounted = false;
    },[]);


    return (
        <div>
            <h1>Departamentos</h1>
            <Link to="/deptosadd">Agregar</Link>
            <ExpensesContext.Provider value={ { deptos,
                                                dispatchDeptos }}>
                { loading && <Loader /> }
                { !loading && <DeptosLista />}
            </ExpensesContext.Provider>
        </div>
    );
}

export default DeptosHome;