import React, { useReducer, useEffect, useState } from 'react';
import PuestosLista from './PuestosLista';
import Loader from '../../../Loader';
import { Link } from 'react-router-dom';

import ExpensesContext from '../../../../context/ExpensesContext';
import PuestosReducer from '../../../../reducers/puestos';
import { AxiosExpenseApi } from '../../../../utils/axiosApi';

const PuestosHome = ()=>{

    const [loading, setLoading ] = useState(false);
    
    const [puestos, dispatchPuestos]  = useReducer(PuestosReducer, []);

    useEffect( ()=>{
    
        let mounted = true;
        if( mounted ){
            
            const axiosApi = AxiosExpenseApi();
            if( axiosApi ){
                axiosApi.get('/puestos').then( res => {
                    dispatchPuestos( {
                        type: "POPULATE_PUESTOS",
                        puestos: res.data
                    });

                    mounted = false;
        
                }).catch(e =>{
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
            <h1>Puestos</h1>
            <Link to="/puestosadd">Agregar</Link>
            <ExpensesContext.Provider value={ { puestos,
                                                dispatchPuestos }}>
                { loading && <Loader />}
                {!loading && <PuestosLista />}
            </ExpensesContext.Provider>
        </div>
    );
}

export default PuestosHome;