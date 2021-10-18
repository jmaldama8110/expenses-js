import React, { useEffect, useState } from 'react';
import OrdenMisionForm from './OrdenMisionForm';
import { history} from '../router/AppRouter';
import Header from './Header';

const OrdenMisionAdd = () => {
    
   const [ordenes, setOrdenes] = useState([])
    
    useEffect( ()=> {

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('ordenes'))
        if( localData ) {
            setOrdenes(localData);

        } 
        //////

    },[]);


    const OnSubmit = (data) => {

        ordenes.push(data);
        localStorage.setItem('ordenes', JSON.stringify(ordenes));
        history.push('/home');
    }
    return (
        <div>
            <Header />
            <h1>Nueva Orden de Mision</h1>
            <OrdenMisionForm onSubmit={OnSubmit}/>
        </div>
    );
}

export { OrdenMisionAdd as default };