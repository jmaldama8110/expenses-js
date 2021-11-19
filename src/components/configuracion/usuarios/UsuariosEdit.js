import React, { useEffect, useState } from "react";
import { history } from "../../../router/AppRouter";
import UsuariosForm from './UsuariosForm';
import Loader from "../../Loader";
import axios from "axios";

const UsuariosEdit = ({ match })=> {

    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{
        
        setLoading(true);
        // retrieves ordenes from localStorage
        const usuarioses = JSON.parse( sessionStorage.getItem("usuario") );
        if( usuarioses ){
            const tokenString = `Bearer ${usuarioses.token}`;
            axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
            axios.defaults.headers.common['Authorization'] = tokenString;

            axios.get(`/usuarios?id=${match.params.id}`).then( (res)=>{
                    setUsuario(res.data[0]);
            }).catch( (e)=>{
                alert(e);
            }).finally( ()=>{
                setLoading(false);
            })
        }

    },[]);

    const OnSubmit = (data) => {
        
        // const new_usuarios = usuarios.map( usu =>{
        //     if( usu.id === data.id) {
        //         return {
        //             ...usu,
        //             ...data
        //         }
        //     }
        //     else{
        //         return usu;
        //     }
        // });

        // localStorage.setItem('usuarios', JSON.stringify(new_usuarios));
        history.push('/usuarios');

    }

    return (
        <div>
            <h1>Editar Usuario</h1>
            {
                loading && <Loader />
            }
            
            {
                !loading &&
                <UsuariosForm
                usuario={usuario}
                onSubmit={OnSubmit}
                />
            }
        </div>
    );
}

export { UsuariosEdit as default };