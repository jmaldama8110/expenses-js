import React, { useEffect } from 'react';
import OrdenMisionForm from './OrdenMisionForm';
import { history} from '../router/AppRouter';

const OrdenMisionAdd = () => {
    
    let ordenes = [];
    
    useEffect( ()=> {

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('ordenes'))
        if( localData ) {
            ordenes = localData;
        } 
        //////

    },[]);


    const OnSubmit = (data) => {

        ordenes.push(data);
        localStorage.setItem('ordenes', JSON.stringify(ordenes));
        history.push('/');
    }
    return (
        <div>
            <h1>Nueva Orden de Mision</h1>
            <OrdenMisionForm onSubmit={OnSubmit}/>
        </div>
    );
}

export { OrdenMisionAdd as default };