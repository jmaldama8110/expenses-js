import React, { useEffect, useReducer, useState } from 'react';

import OrdenMisionLista from './ordenmision/OrdenMisionLista';
import OrdenMisionFiltro from './ordenmision/OrdenMisionFiltro';

import ordenesReducer from '../reducers/ordenes';
import ExpensesContext from '../context/ExpensesContext';
import Header from './Header';
import Loader from './Loader';

import { AxiosExpenseApi } from '../utils/axiosApi';


const Home = () => {

    const [ordenes, dispatchOrdenes ] = useReducer(ordenesReducer,[]);

    const [usuario, setUsuario ] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{


        const localSession = JSON.parse(sessionStorage.getItem('usuario'));
        setUsuario(localSession.info.nombre);
    
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
                <ExpensesContext.Provider value={ { ordenes, dispatchOrdenes,usuario }}>
                    <OrdenMisionLista />
                </ExpensesContext.Provider>

            </div>}
        </div>
    
    );
}

export default Home;
