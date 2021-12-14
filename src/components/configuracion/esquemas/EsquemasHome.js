import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EsquemasLista from "./EsquemasLista";
import Loader from "../../Loader";

import ExpensesContext from "../../../context/ExpensesContext";
import EsquemasReducer from '../../../reducers/esquemas';

import { AxiosExpenseApi,getUsuarioSession } from "../../../utils/axiosApi";

const EsquemasHome = () => {

    const [esquemas, dispatchEsquemas] = useReducer( EsquemasReducer, [] );

    const [loading, setLoading] = useState(false);

    useEffect( ()=>{
    
        const loadData = async () =>{

            try {
                setLoading(true);

                const axiosApi = AxiosExpenseApi();
                const empresaid = getUsuarioSession().info.preferences.empresa_default.id;
                const res = await axiosApi.get(`/esquemas/${empresaid}`);
                
                dispatchEsquemas({
                    type: "POPULATE_ESQUEMAS",
                    esquemas: res.data
                })
    
                setLoading(false);
            }
            catch (e) {
                alert(e);
            }
        }

        loadData();

        
        
    },[]);

    return (
        <div>
            <h1>Esquemas Contables</h1>

            <Link to='/esquemasadd'>Agregar</Link>

            <ExpensesContext.Provider 
                    value={   { esquemas,
                                dispatchEsquemas }}>
                    { loading && <Loader />}
                    { !loading && <EsquemasLista /> }
            </ExpensesContext.Provider>
            <Link to="/">Regresar</Link>
           
        </div>
    );
}

export default EsquemasHome;