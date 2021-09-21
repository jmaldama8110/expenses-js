import React, { useEffect, useReducer } from 'react';
import {Link} from 'react-router-dom';

import OrdeMisionLista from './OrdeMisionLista';
import OrdenMisionFiltro from './OrdenMisionFiltro';

import ordenesReducer from '../reducers/ordenes';
import ComprobantesContext from '../context/comprobantesContext';

const Home = () => {

    const [ordenes, dispatchOrdenes ] = useReducer(ordenesReducer,[])

    useEffect( ()=>{

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('ordenes'))
        if( localData ) {
            
            dispatchOrdenes({
                    type: 'POPULATE_ORDENES',
                    ordenes: localData
            })
        } 
        //////

    },[]);

    // useEffect( ()=>{
    //     localStorage.setItem('ordenes', JSON.stringify(ordenes))
    // },[ordenes])

    return (
        <div>
            <h1>Busqueda de una orden de misión!</h1>
            <nav>
                <ul>
                    <li> <Link to="/add">Nueva Mision</Link> </li>
                    <li><a href="#comprobacion">Comprobacion</a></li>
                    <li><Link to="/config">Configuraciones</Link></li>
                    
                    <li><a href="#perfil">Mi perfil</a></li>
                </ul>
            </nav>
            <ComprobantesContext.Provider value={ { ordenes, dispatchOrdenes }}>
                <OrdenMisionFiltro />
                <OrdeMisionLista /> 
            </ComprobantesContext.Provider>

        </div>
    
    );
}

export default Home;
