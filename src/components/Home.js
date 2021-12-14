import React, { useEffect, useReducer, useState } from 'react';

import OrdenMisionLista from './ordenmision/OrdenMisionLista';

import ordenesReducer from '../reducers/ordenes';
import ExpensesContext from '../context/ExpensesContext';
import Header from './Header';
import Loader from './Loader';

import { AxiosExpenseApi } from '../utils/axiosApi';


const Home = () => {

    const [ordenes, dispatchOrdenes ] = useReducer(ordenesReducer,[]);

    const [usuario, setUsuario ] = useState('');
    const [empresa_actual, setEmpresaActual] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{

        const localSession = JSON.parse(sessionStorage.getItem('usuario'));
        setUsuario(localSession.info.nombre);

        if( localSession.info.preferences ){
            setEmpresaActual( localSession.info.preferences.empresa_default );
        }
        setLoading(true);
        const axiosApi = AxiosExpenseApi();
        axiosApi.get('/ordenes').then( res => {
            dispatchOrdenes({
                type: 'POPULATE_ORDENES',
                ordenes: res.data
            });
        }).catch( e => {
            alert(e);
        }).finally( ()=>{
            setLoading(false);
        });

    },[]);

    return (
        <div>
        <Header />
            { loading && <Loader />}
            { !loading&&
            <div>
                <h1>Hola {usuario}, busca tus misiones!</h1>
                <p>Ambiente: { empresa_actual ? <strong><label>{empresa_actual.nombre}</label></strong>
                                        : <strong> <label>No hay una empresa predeterminada</label></strong>}</p>

                <ExpensesContext.Provider value={ { ordenes, dispatchOrdenes }}>
                    <OrdenMisionLista />
                </ExpensesContext.Provider>

            </div>}
        </div>
    
    );
}

export default Home;
