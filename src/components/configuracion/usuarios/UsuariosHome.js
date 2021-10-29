import React, { useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

import UsuariosLista from "./UsuariosLista";

import ExpensesContext from "../../../context/ExpensesContext";
import UsuariosReducer from "../../../reducers/usuarios";


const UsuariosHome = () => {

    const [usuarios, dispatchUsuarios] = useReducer( UsuariosReducer, [] );
 
    useEffect( ()=>{
    
        const lsUsuarios = JSON.parse( localStorage.getItem("usuarios") );
      
        if( lsUsuarios ) {
            dispatchUsuarios( {
                type: "POPULATE_USUARIOS",
                usuarios: lsUsuarios
            })
        }

    },[]);

    useEffect( ()=>{
        localStorage.setItem('usuarios', JSON.stringify( usuarios ) );
    },[usuarios])


    return (
        <div>
            <h1>Usuarios Registrados</h1>

            <Link to='/usuariosadd'>Agregar</Link>

            <ExpensesContext.Provider 
                    value={   { usuarios,
                                dispatchUsuarios }}>
                    <UsuariosLista />
            </ExpensesContext.Provider>
            <Link to="/">Regresar</Link>
        </div>
    );
}

export default UsuariosHome;