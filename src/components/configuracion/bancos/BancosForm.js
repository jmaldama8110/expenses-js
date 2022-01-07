import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const BancosForm = ( { onSubmit, banco} )=> {

    const [numero_cuenta, setNumeroCuenta] = useState('');
    const [clabe, setClabe] = useState('');
    const [bancoClave, setBancoClave] = useState('');
    const [bancoNombre, setBancoNombre] = useState('');

    useEffect( ()=>{
        let mounted = true;
        
        if( mounted ){
            if(banco){
                setNumeroCuenta(banco.numero_cuenta);
                setClabe( banco.clabe);

                if( banco.banco ){
                    setBancoClave( banco.banco[0]);
                    setBancoNombre( banco.banco[1]);
                }
            }
        
        }

        return ()=> mounted = false;
    },[])

    const onGuardar = (e)=> {
        e.preventDefault();
              
        const data = {
            numero_cuenta,
            clabe,
            banco: [ bancoClave, bancoNombre]
        }
        onSubmit(data);

    }

    return (
        <form onSubmit={onGuardar}>
            <p>Numero de cuenta</p>
            <input
                type="text"
                placeholder="Numero de cuenta"
                value={numero_cuenta}
                onChange={ (e) => setNumeroCuenta(e.target.value)}
            ></input>
            <p>CLABE</p>
            <input
                type="text"
                placeholder="CLABE interbancaria"
                value={clabe}
                onChange={ (e) => setClabe(e.target.value)}
            ></input>

            <p>Clave del Banco o IFI</p>
            <input
                type="text"
                placeholder="Clave del Banco"
                value={bancoClave}
                onChange={ (e) => setBancoClave(e.target.value)}
            ></input>

            <p>Nombre del banco</p>
            <input
                type="text"
                placeholder="Nombre del banco"
                value={bancoNombre}
                onChange={ (e) => setBancoNombre(e.target.value)}
            ></input>

            <p></p>
            <button>Guardar</button>
            <Link to="/bancos">Cancelar</Link>
        </form>
    
    );
}

export { BancosForm as default };