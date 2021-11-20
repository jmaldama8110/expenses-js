import React, { useReducer, useEffect, useState } from 'react';
import EmpresasLista from './EmpresasLista';

import { Link } from 'react-router-dom';

import ExpensesContext from '../../../context/ExpensesContext';
import EmpresasReducer from '../../../reducers/empresas';
import Loader from '../../Loader';

import { AxiosExpenseApi } from '../../../utils/axiosApi';

const EmpresasHome = ()=>{

    const [empresas, dispatchEmpresas]  = useReducer(EmpresasReducer, []);
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{

        let mounted = true;
        
        if( mounted ) {            
            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            if( axiosApi ){
                axiosApi.get('/empresas').then( (res)=>{
                
                    dispatchEmpresas( {
                        type: "POPULATE_EMPRESAS",
                        empresas: res.data
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
            <h1>Empresas</h1>
            { !loading && <Link to="/empresasadd">Agregar</Link>}
            <ExpensesContext.Provider value={ { empresas,
                                                dispatchEmpresas }}>
                { loading && <Loader />}
                { !loading && <EmpresasLista />}
            </ExpensesContext.Provider>
            <Link to='/home'>Regresar</Link>
        </div>
    );
}

export default EmpresasHome;