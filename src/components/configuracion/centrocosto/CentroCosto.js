import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

import CentroCostoLista from './CentroCostoLista';

import ExpensesContext from '../../../context/ExpensesContext';
import CentroCostoReducer from '../../../reducers/centrocosto';


const CentroCosto = () => {

    const [centroscosto, dispatchCentroCosto] = useReducer(CentroCostoReducer, []);

    const [nombre_centro_costo,setNombreCentroCosto] = useState('');
    const [codigo, setCodigo] = useState('');


    useEffect( ()=>{
    
        const localData = JSON.parse( localStorage.getItem("centroscosto") );

        if( localData ) {
            dispatchCentroCosto( {
                type: "POPULATE_CC",
                centroscosto: localData
            })
        }


    },[]);

    useEffect( ()=>{
        localStorage.setItem('centroscosto', JSON.stringify( centroscosto ));
    },[centroscosto])


    const onSubmit = (e)=>{
        e.preventDefault();

        const randId =  Math.floor(Math.random() * 10000 );

        dispatchCentroCosto({
            type: "ADD_CC",
            id: randId.toString(),
            nombre: nombre_centro_costo,
            codigo,
            activo: true
            
        });

        setNombreCentroCosto('');
        setCodigo('');
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
                <button>Guardar</button>
            </form>


        <ExpensesContext.Provider value={{ centroscosto,dispatchCentroCosto }}>
                <CentroCostoLista />
        </ExpensesContext.Provider>

            
            <Link to="/home">Regresar</Link>
        </div>
    );
}

export { CentroCosto as default };
