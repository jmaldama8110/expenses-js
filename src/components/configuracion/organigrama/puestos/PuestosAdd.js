
import React, { useEffect } from 'react';
import PuestosForm from './PuestosForm';
import { history } from "../../../../router/AppRouter";

const PuestosAdd = () => {

    let puestos = [];

    useEffect( ()=> {

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('puestos'))
        if( localData ) {
            puestos = localData;

        } 
        //////

    },[]);

    const onSubmit = (data) => {

        puestos.push(data);
        localStorage.setItem('puestos', JSON.stringify(puestos));
        history.push('/organigrama');
    }

    return (
        <div>
            <h1>Nuevo Puesto</h1>
            <PuestosForm onSubmit={onSubmit}/>
        </div>
    );
}

export { PuestosAdd as default };