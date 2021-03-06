import React,{ useEffect, useState } from "react";

const ComprobantesForm = ( {  comprobante, onSubmit } ) =>{


    const [tipo, setTipo] = useState('');
    const [fecha_aplicacion, setFechaAplicacion] = useState('');
    const [concepto, setConcepto] = useState('');
    const [importe, setImporte] = useState('');
    const [subtotal, setSubtotal] = useState('');
    const [iva, setIva] = useState('');
    const [fecha_comprobante, setFechaComprobante] = useState('');

    useEffect( ()=> {

        let mounted = true;

        if( mounted ){
            if( comprobante ){

                setTipo( comprobante.tipo );
                setFechaAplicacion( comprobante.fecha_aplicacion );
                setConcepto( comprobante.concepto);
                setImporte( comprobante.importe );
                setSubtotal( comprobante.subtotal);
                setIva( comprobante.iva);
                setFechaComprobante( comprobante.fecha_comprobante);
            }
        }


        return () => mounted = false;

    },[])

    const onGuardar = (e) => {

        e.preventDefault();

        const data = {
            tipo,
            fecha_aplicacion,
            concepto,
            importe,
            subtotal,
            iva,
            fecha_comprobante
        }
        onSubmit(data);

    }

    return (
        <div>
                <label>Tipo</label>
                <select     value={tipo}                              
                            onChange={ (e)=> {
                                        setTipo(e.target.value);
                                        }}>
                            <option value="A">Alimentos</option>
                            <option value="T">Transporte</option>
                            <option value="R">Recepcion</option>
                            <option value="H">Hospedaje</option>
                            <option value="M">Mantimiento Vehiculos</option>
                            <option value="N">No Deducibles</option>
                </select> 
                <label>Fecha Aplicacion</label>
                <input
                    type="date"
                    value={fecha_aplicacion}
                    onChange={ (e) => setFechaAplicacion(e.target.value) }
                ></input>
                <label>Concepto</label>
                <input 
                    type="text"
                    value={concepto}
                    onChange={ (e)=>{ setConcepto(e.target.value) }}
                ></input>

                <label>Fecha Comprobante</label>
                <input
                    type="date"
                    value={fecha_comprobante}
                    onChange={ (e) => setFechaComprobante(e.target.value) }
                ></input>

                <label>Importe</label>
                <input 
                    type="text"
                    value={importe}
                    onChange={ (e) => setImporte(e.target.value) }
                ></input>
                <label>Subtotal</label>
                <input 
                    type="text"
                    value={subtotal}
                    onChange={ (e) => setSubtotal(e.target.value) }
                ></input>
                <label>IVA</label>
                <input 
                    type="text"
                    value={iva}
                    onChange={ (e) => setIva(e.target.value) }
                ></input>


                <button onClick={onGuardar}>Ok</button>

        </div> 
    );
}

export { ComprobantesForm as default };