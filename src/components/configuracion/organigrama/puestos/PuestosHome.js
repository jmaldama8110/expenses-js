import React, { useReducer, useEffect, useState } from 'react';
import PuestosLista from './PuestosLista';
import Loader from '../../../Loader';
import { Link } from 'react-router-dom';

import ExpensesContext from '../../../../context/ExpensesContext';
import PuestosReducer from '../../../../reducers/puestos';
import { AxiosExpenseApi } from '../../../../utils/axiosApi';

const PuestosHome = ()=>{

    const [loading, setLoading ] = useState(false);
    
    const [puestos, dispatchPuestos]  = useReducer(PuestosReducer, []);

    useEffect( ()=>{

        const loadData = async () => {

            try{
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                let res = await axiosApi.get('/puestos');
                dispatchPuestos( {
                    type: "POPULATE_PUESTOS",
                    puestos: res.data
                });
                setLoading(false);
            }
            catch(e) {
                alert(e);
            }
            

        }
        
        loadData();
        
    },[]);


    return (
        <div>
            <h1>Puestos</h1>
            <Link to="/puestosadd">Agregar</Link>
            <ExpensesContext.Provider value={ { puestos,
                                                dispatchPuestos }}>
                { loading && <Loader />}
                {!loading && <PuestosLista />}
            </ExpensesContext.Provider>
        </div>
    );
}

export default PuestosHome;