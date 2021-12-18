import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UsuariosLista from "./UsuariosLista";
import Loader from "../../Loader";

import ExpensesContext from "../../../context/ExpensesContext";
import UsuariosReducer from "../../../reducers/usuarios";

import { AxiosExpenseApi } from "../../../utils/axiosApi";

const UsuariosHome = () => {

    const [usuarios, dispatchUsuarios] = useReducer( UsuariosReducer, [] );

    const [loading, setLoading] = useState(false);

    useEffect( ()=>{
    
        const loadData = async () => {

            try{
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                const res = await axiosApi.get('/usuarios/all');
                dispatchUsuarios({
                    type: "POPULATE_USUARIOS",
                    usuarios: res.data
                })
                setLoading(false);
            }
            catch(e){

            }

        }
        loadData();


    },[]);

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