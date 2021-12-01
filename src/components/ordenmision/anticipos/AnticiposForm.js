import React,{ useEffect, useState } from "react";

const AnticiosForm = ( { anticipo, onSubmit } ) =>{

    const [fecha_aplicacion, setFechaAplicacion] = useState('');

    const [tipo_mov, setTipoMov] = useState('');
    const [tipo_movId, setTipoMovId] = useState('');

    const [importe, setImporte] = useState('');
    const [concepto, setConcepto] = useState('');
    const [fecha_comprobante, setFechaComprobante] = useState('');


    useEffect( ()=> {

        let mounted = true;

        if( mounted ){
            if( anticipo ){
                setFechaAplicacion( anticipo.fecha_aplicacion );
                setTipoMovId( anticipo.tipo_mov[0]);
                setConcepto( anticipo.concepto);
                setImporte( anticipo.importe );
                setFechaComprobante( anticipo.fecha_comprobante);
            }
        }


        return () => mounted = false;

    },[])

    const onGuardar = (e) => {

        e.preventDefault();

        const data = {
            fecha_aplicacion,
            tipo_mov: [tipo_movId, tipo_mov],
            concepto,
            importe,
            fecha_comprobante
        }
        onSubmit(data);

    }

    return (
        <div>
                <label>Fecha Aplicacion</label>
                <input
                    type="date"
                    value={fecha_aplicacion}
                    onChange={ (e) => setFechaAplicacion(e.target.value) }
                ></input>
                <label>Tipo</label>
                <select     value={tipo_movId}                              
                            onChange={ (e)=> {
                                        setTipoMovId(e.target.value);
                                        setTipoMov(e.target.options[e.target.selectedIndex].text);
                                        }}>
                            <option value="A">Anticipo</option>
                            <option value="R">Reembolso</option>
                            <option value="X">Reversion</option>
                </select>
                <label>Importe</label>
                <input 
                    type="text"
                    value={importe}
                    onChange={ (e) => setImporte(e.target.value) }
                ></input>
                <label>Fecha Comprobante</label>
                <input
                    type="date"
                    value={fecha_comprobante}
                    onChange={ (e) => setFechaComprobante(e.target.value) }
                ></input>
                <label>Concepto</label>
                <input 
                    type="text"
                    value={concepto}
                    onChange={ (e)=>{ setConcepto(e.target.value) }}
                ></input>
                <button onClick={onGuardar}>Ok</button>

        </div> 
    );
}

export { AnticiosForm as default };