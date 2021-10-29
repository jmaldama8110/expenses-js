import React, { useEffect, useState } from "react";
import { history } from "../../../router/AppRouter";
import UsuariosForm from './UsuariosForm';

const UsuariosEdit = ({ match })=> {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('usuarios'))
        if( localData ) {
            setUsuarios(localData);
            setLoading(false);
        }
        //////

    },[]);

    const OnSubmit = (data) => {
        
        const new_usuarios = usuarios.map( usu =>{
            if( usu.id === data.id) {
                return {
                    ...usu,
                    ...data
                }
            }
            else{
                return usu;
            }
        });

        localStorage.setItem('usuarios', JSON.stringify(new_usuarios));
        history.push('/usuarios');

    }

    return (
        <div>
            <h1>Editar Usuario</h1>
            
            {
                !loading &&
                <UsuariosForm
                usuario={usuarios.find( usu => usu.id === match.params.id ) }
                onSubmit={OnSubmit}
            />}
        </div>
    );
}

export { UsuariosEdit as default };