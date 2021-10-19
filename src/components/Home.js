import React, { useEffect, useReducer, useState } from 'react';

import OrdenMisionLista from './OrdenMisionLista';
import OrdenMisionFiltro from './OrdenMisionFiltro';

import ordenesReducer from '../reducers/ordenes';
import ComprobantesContext from '../context/comprobantesContext';
import Header from './Header';




const Home = () => {

    const [ordenes, dispatchOrdenes ] = useReducer(ordenesReducer,[]);

    const [usuario, setUsuario ] = useState('');

    useEffect( ()=>{

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('ordenes'));
        const localSession = JSON.parse(sessionStorage.getItem('user'));

        setUsuario(localSession.info.name);
        
        if( localData ) {
            
            dispatchOrdenes({
                    type: 'POPULATE_ORDENES',
                    ordenes: localData
            })
        } 
        //////

    },[]);


    return (
        <div>
        <Header />
        <h1>Hola {usuario}, busca tus misiones!</h1>
            <ComprobantesContext.Provider value={ { ordenes, dispatchOrdenes,usuario }}>
                <OrdenMisionFiltro />
                <OrdenMisionLista />
            </ComprobantesContext.Provider>

        </div>
    
    );
}

export default Home;
