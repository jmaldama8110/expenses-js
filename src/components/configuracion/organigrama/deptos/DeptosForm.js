import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const DeptosForm = ( { onSubmit, depto} )=> {

    const [titulo, setTitulo] = useState('');

    useEffect( ()=>{
        let mounted = true;
        if( mounted ){

            if(depto){
                setTitulo(depto.titulo);
            }
        }

        return ()=> mounted = false;
    },[])

    const onGuardar = (e)=> {
        e.preventDefault();
        
        const randId =  Math.floor(Math.random() * 10000 );
        
        const data = {
            id: !depto ? randId.toString(): depto.id,
            titulo: titulo
        }
        onSubmit(data);

    }

    return (
        <form onSubmit={onGuardar}>
            <input
                type="text"
                placeholder="Titulo del puesto"
                value={titulo}
                onChange={ (e) => setTitulo(e.target.value)}
            ></input>

            <button>Guardar</button>
            <Link to="/organigrama">Cancelar</Link>
        </form>
    
    );
}

export { DeptosForm as default };