
import React, { useEffect } from 'react';
import UsuariosForm from './UsuariosForm';
import { history} from '../../../router/AppRouter';

const UsuariosAdd = () => {

    let usuarios = [];

    useEffect( ()=> {

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('usuarios'))
        if( localData ) {
            usuarios = localData;

        } 
        //////

    },[]);

    const onSubmit = (data) => {

        usuarios.push(data);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        history.push('/usuarios');
    }

    return (
        <div>
            <h1>Nuevo Usuario</h1>
            <UsuariosForm onSubmit={onSubmit}/>
        </div>
    );
}

export { UsuariosAdd as default };