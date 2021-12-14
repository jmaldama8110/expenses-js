import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

import CentroCostoLista from './CentroCostoLista';
import Loader from '../../Loader';

import ExpensesContext from '../../../context/ExpensesContext';
import CentroCostoReducer from '../../../reducers/centrocosto';

import { AxiosExpenseApi,getUsuarioSession } from '../../../utils/axiosApi';


const CentroCosto = () => {

    const [centroscosto, dispatchCentroCosto] = useReducer(CentroCostoReducer, []);

    const [nombre_centro_costo,setNombreCentroCosto] = useState('');
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{
        
        setLoading(true);

        const axiosApi = AxiosExpenseApi();
        const empresaid = getUsuarioSession().info.preferences.empresa_default.id;

        if( axiosApi ){
           
            axiosApi.get(`/centroscosto/${empresaid}`).then( (res)=>{
                if( res.data ){
                    dispatchCentroCosto( {
                        type: "POPULATE_CC",
                        centroscosto: res.data
                    });
                }

            }).catch( (e)=>{
                alert(e);
            }).finally( ()=>{
                setLoading(false);
            })
    
        }


    },[]);


    const onSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);

        const axiosApi = AxiosExpenseApi();

        if( axiosApi ){

            axiosApi.post('/centroscosto',{
                empresa_id: getUsuarioSession().info.preferences.empresa_default.id,
                nombre: nombre_centro_costo,
                codigo,
                activo: true,
            }).then( (res)=>{

                dispatchCentroCosto({
                    type: "ADD_CC",
                    _id: res.data._id,
                    nombre: res.data.nombre,
                    codigo: res.data.codigo,
                    activo: true
                    
                });
    
                setNombreCentroCosto('');
                setCodigo('');

            }).catch( (e)=>{
                alert(e);
            }).finally( ()=>{
                setLoading(false);
            })

        }
    }

    return (
        <div>
            <h1>Centros de Costos</h1>


            <form onSubmit={onSubmit}>
                <input  type="text"
                        placeholder="nombre centro costo"
                        value={nombre_centro_costo}
                        onChange={ e => setNombreCentroCosto(e.target.value) }
                ></input>
                <input  type="text"
                        placeholder="codigo"
                        value={codigo}
                        onChange={ e => setCodigo(e.target.value) }
                ></input>
                { !loading && <button>Guardar</button>}
            </form>


        <ExpensesContext.Provider value={{ centroscosto,dispatchCentroCosto }}>
                { loading && <Loader />}
                { !loading && <CentroCostoLista />}
        </ExpensesContext.Provider>

            
            <Link to="/home">Regresar</Link>
        </div>
    );
}

export { CentroCosto as default };
