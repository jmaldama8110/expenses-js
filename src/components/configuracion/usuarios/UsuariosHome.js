import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UsuariosLista from "./UsuariosLista";
import Loader from "../../Loader";

import ExpensesContext from "../../../context/ExpensesContext";
import UsuariosReducer from "../../../reducers/usuarios";

import axios from "axios";


const UsuariosHome = () => {

    const [usuarios, dispatchUsuarios] = useReducer( UsuariosReducer, [] );

    const [loading, setLoading] = useState(false);

    useEffect( ()=>{
    
        setLoading(true);

        const usuario = JSON.parse( sessionStorage.getItem("usuario") );
        // obtiene el usuario de la sesion Local, solo si existe, hacemos la peticion
        if( usuario ){
            const tokenString = `Bearer ${usuario.token}`;
            axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
            axios.defaults.headers.common['Authorization'] = tokenString;

            axios.get('/usuarios').then( (res)=>{
                if( res.data ){
                    dispatchUsuarios( {
                        type: "POPULATE_USUARIOS",
                        usuarios: res.data
                    });
                }

            }).catch( (e)=>{
                alert(e);
            }).finally( ()=>{
                setLoading(false);
            })
        }
        

    },[]);

    // useEffect( ()=>{
    //     localStorage.setItem('usuarios', JSON.stringify( usuarios ) );
    // },[usuarios])


    return (
        <div>
            <h1>Usuarios Registrados</h1>

            <Link to='/usuariosadd'>Agregar</Link>

            <ExpensesContext.Provider 
                    value={   { usuarios,
                                dispatchUsuarios }}>
                    { loading && <Loader />}
                    { !loading && <UsuariosLista /> }
            </ExpensesContext.Provider>
            <Link to="/">Regresar</Link>
           
        </div>
    );
}

export default UsuariosHome;