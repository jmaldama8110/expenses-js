
import React, { useEffect } from 'react';
import DeptosForm from './DeptosForm';
import { history } from "../../../../router/AppRouter";

const DeptosAdd = () => {

    let deptos = [];

    useEffect( ()=> {

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('deptos'))
        if( localData ) {
            deptos = localData;

        } 
        //////

    },[]);

    const onSubmit = (data) => {

        deptos.push(data);
        localStorage.setItem('deptos', JSON.stringify(deptos));
        history.push('/organigrama');
    }

    return (
        <div>
            <h1>Nuevo Departamento</h1>
            <DeptosForm onSubmit={onSubmit}/>
        </div>
    );
}

export { DeptosAdd as default };