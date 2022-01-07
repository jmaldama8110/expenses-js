import React,{ useEffect, useState } from "react";

const ConceptosForm = ( {  concepto, onSubmit } ) =>{

    const [tipo_concepto, setTipo] = useState('');
    const [conceptoD, setConcepto] = useState('');
    const [tope_importe, setImporte] = useState('');

    useEffect( ()=> {

        let mounted = true;

        if( mounted ){
            if( concepto ){

                setTipo( concepto.tipo_concepto[0] );
                setConcepto( concepto.tipo_concepto[1]);
                setImporte( concepto.tope_importe );
            }
        }


        return () => mounted = false;

    },[])

    const onGuardar = (e) => {

        e.preventDefault();

        const data = {
            tipo_concepto:[tipo_concepto, conceptoD],
            tope_importe
        }
        onSubmit(data);

    }

    return (
        <div>
                <label>Tipo</label>
                <select     value={tipo_concepto}                              
                            onChange={ (e)=> {
                                        setTipo(e.target.value);
                                        setConcepto(e.target.options[e.target.selectedIndex].text);
                                        }}>
                            <option value="A">Alimentos</option>
                            <option value="T">Transporte</option>
                            <option value="R">Recepcion</option>
                            <option value="H">Hospedaje</option>
                            <option value="M">Mantimiento Vehiculos</option>
                            <option value="N">No Deducibles</option>
                </select> 
                <label>Importe</label>
                <input 
                    type="text"
                    value={tope_importe}
                    onChange={ (e) => setImporte(e.target.value) }
                ></input>
                <button onClick={onGuardar}>Ok</button>

        </div> 
    );
}

export { ConceptosForm as default };