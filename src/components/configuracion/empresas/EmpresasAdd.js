
import React, { useEffect } from 'react';
import EmpresasForm from './EmpresasForm';
import { history } from '../../../router/AppRouter';

const EmpresasAdd = () => {

    let empresas = [];

    useEffect( ()=> {

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('empresas'))
        if( localData ) {
            empresas = localData;

        } 
        //////

    },[]);

    const onSubmit = (data) => {

        empresas.push(data);
        localStorage.setItem('empresas', JSON.stringify(empresas));
        history.push('/empresas');
    }

    return (
        <div>
            <h1>Nueva Empresa</h1>
            <EmpresasForm onSubmit={onSubmit}/>
        </div>
    );
}

export { EmpresasAdd as default };