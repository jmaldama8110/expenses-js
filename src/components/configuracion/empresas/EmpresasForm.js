import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const EmpresasForm = ( { onSubmit, empresa} )=> {

    const [nombre, setNombre] = useState('');

    useEffect( ()=>{
        let mounted = true;
        
        if( mounted ){
            if(empresa){
                setNombre(empresa.nombre);
            }
        
        }

        return ()=> mounted = false;
    },[])

    const onGuardar = (e)=> {
        e.preventDefault();
              
        const data = {
            nombre
        }
        onSubmit(data);

    }

    return (
        <form onSubmit={onGuardar}>
            <input
                type="text"
                placeholder="Titulo del puesto"
                value={nombre}
                onChange={ (e) => setNombre(e.target.value)}
            ></input>

            <button>Guardar</button>
            <Link to="/empresas">Cancelar</Link>
        </form>
    
    );
}

export { EmpresasForm as default };