import React, { useReducer, useEffect, useState } from 'react';
import BancosLista from './BancosLista';

import { Link } from 'react-router-dom';

import ExpensesContext from '../../../context/ExpensesContext';
import BancosReducer from '../../../reducers/bancos';
import Loader from '../../Loader';

import { AxiosExpenseApi } from '../../../utils/axiosApi';

const BancosHome = ()=>{

    const [bancos, dispatchBancos]  = useReducer(BancosReducer, []);
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{

        let mounted = true;
        
        if( mounted ) {            
            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            if( axiosApi ){
                axiosApi.get('/bancos').then( (res)=>{
                
                    dispatchBancos( {
                        type: "POPULATE_BANCOS",
                        bancos: res.data
                    });
                
                }).catch( (e) =>{
                    alert(e);
                }).finally( () =>{
                    setLoading(false);
                })
            }
        }
      return  () => mounted = false;

    },[]);

    return (
        <div>
            <h1>Bancos</h1>
            { !loading && <Link to="/bancosadd">Agregar</Link>}
            <ExpensesContext.Provider value={ { bancos,
                                                dispatchBancos }}>
                { loading && <Loader />}
                { !loading && <BancosLista />}
            </ExpensesContext.Provider>
            <Link to='/home'>Regresar</Link>
        </div>
    );
}

export default BancosHome;