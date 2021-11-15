import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const OrdenMisionForm = ( { onSubmit, orden} )=> {

    const [folio, setFolio] = useState('');
    const [fecha_aplicacion, setFechaAplicacion] = useState('');

    const [empleadoId, setEmpleadoId] = useState('');
    const [empleado, setEmpleado] = useState('');

    const [centrocostoId, setCentroCostoId] = useState('');
    const [centrocosto, setCentroCosto] = useState('');

    const [esquemaId, setEsquemaId] = useState('');
    const [esquema, setEsquema] = useState('');

    const [fecha_desde, setFechaDesde] = useState('');
    const [fecha_hasta, setFechaHasta] = useState('');
    const [transporte, setTransporte ] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [estatusId, setEstatusId] = useState("");
    const [estatus, setEstatus] = useState("");

    const Guardar = (e)=> {
        e.preventDefault();

        const randId =  Math.floor(Math.random() * 10000 );

        const data = {
            folio: !orden ? randId.toString(): orden.folio,
            fecha_aplicacion,
            empleado:[ empleadoId, empleado ],
            centro_costo: [centrocostoId, centrocosto],
            esquema: [esquemaId, esquema],
            fecha_desde,
            fecha_hasta,
            transporte,
            descripcion,
            estatus: !orden ? ['P','Pendiente'] : [estatusId,estatus],
        }
        onSubmit(data);

    }

    useEffect( ()=>{

        const lsCentroCosto = JSON.parse( localStorage.getItem("centroscosto") );
        if( lsCentroCosto ){
            setCentroCosto( lsCentroCosto );
        }
      
       if(orden){
           setFolio(orden.folio);
           setFechaAplicacion(orden.fecha_aplicacion);
           setDescripcion(orden.descripcion);
           setTransporte(orden.transporte);  
           setFechaDesde(orden.fecha_desde);
           setFechaHasta(orden.fecha_hasta);

           setEmpleadoId(orden.empleado[0]);
           setEmpleado(orden.empleado[1]);

           setEsquemaId(orden.esquema[0]);
           setEsquema(orden.esquema[1]);
           
           setCentroCostoId(orden.centro_costo[0]);
           setCentroCosto(orden.centro_costo[1]);

           setEstatusId( orden.estatus[0]);
           setEstatus(orden.estatus[1]);

       }

    },[])

    return (
        <form onSubmit={Guardar}>
                 <div className="generales">
                    <label>Folio</label>
                        <input  type="text"
                                required
                                value={folio}
                                disabled
                                onChange={(e)=>setFolio(e.target.value)}
                        ></input>
                    <label>Fecha apliación</label>
                        <input  type="date"
                                required
                                value={fecha_aplicacion}
                                onChange={ (e)=> setFechaAplicacion(e.target.value)}
                        ></input>

                    <select     value={empleadoId} 
                                onChange={ (e)=> {
                                    setEmpleadoId(e.target.value);
                                    setEmpleado(e.target.options[e.target.selectedIndex].text);
                                } }>
                        <option value="0">Empleado</option>
                        <option value="10">Roberto Chacon</option>
                        <option value="13">Oscar Roman</option>
                        <option value="14">Andres Morales</option>
                        <option value="15">Luis Alberto</option>
                    </select>

                  <select       value={centrocostoId}
                                onChange={ 
                                    (e)=> {
                                        setCentroCostoId(e.target.value);
                                        setCentroCosto(e.target.options[e.target.selectedIndex].text);
                                    }
                                }>
                        <option value="NA">Centro de Costo</option>
                        <option value="DTI">Direccion de TI</option>
                        <option value="DAF">Direccion de Administracion y Finanzas</option>
                        <option value="DTH">Direccion de Talento</option>
                        <option value="SUC">Sucursal</option>
                    </select>

                    <select     value={esquemaId}
                                onChange={ (e)=> {
                                    setEsquemaId(e.target.value);
                                    setEsquema(e.target.options[e.target.selectedIndex].text);
                                    }}>
                        <option value="NA">Esquema</option>
                        <option value="A1">Esquema A1</option>
                        <option value="B2">Esquema B2</option>
                        <option value="B3">Esquema B3</option>
                        <option value="DC">Esquema DC</option>
                    </select>

                    <select     value={estatusId}
                                disabled
                                onChange={ (e)=> {
                                    setEstatusId(e.target.value);
                                    setEstatus(e.target.options[e.target.selectedIndex].text);
                                    }}>
                        <option value="P">Pendiente</option>
                        <option value="A">Autorizada</option>
                        <option value="V">Vencida</option>
                        <option value="F">Finalizada</option>
                        <option value="C">Cancelada</option>
                    </select>

                </div>
                <div className="mision">
                    <label>De</label>
                    <input  type="date"
                            required
                            value={fecha_desde}
                            onChange={ (e)=> setFechaDesde(e.target.value)}
                    ></input>
                    <label>A</label>
                    <input  type="date"
                            required
                            value={fecha_hasta}
                            onChange={ (e)=>setFechaHasta(e.target.value)}
                    ></input>

                    <label>Transportación</label>

                    <input  id="aereo" 
                            type="radio" 
                            name="transporte" 
                            value="aereo"
                            checked={ transporte === 'aereo'}
                            onChange={ (e) => setTransporte(e.target.value) }
                            />
                    <label htmlFor="aereo">Aéreo</label>

                    <input  type="radio" 
                            id="autobus"
                            name="transporte"
                            value="autobus" 
                            checked={ transporte === 'autobus' }
                            onChange= { (e) => setTransporte(e.target.value ) }
                            />
                    <label htmlFor="autobus">Autobus</label>

                    <input  type="radio"
                            id="auto"
                            name="transporte"
                            value="auto"
                            checked={ transporte === 'auto'}
                            onChange= { (e)=> setTransporte(e.target.value) }
                            />
                    <label htmlFor="auto">Automóvil</label><br /><br />

                    <label>Descripcion de mision</label>
                    <textarea 
                        value={descripcion}
                        onChange={ (e)=> setDescripcion( e.target.value ) }
                        placeholder="Escriba aqui una descripcion detallada de la mision a realiza"
                    ></textarea>
                
                </div>
                <button>Guardar</button>
                <Link to="/">Cancelar</Link>

        </form>
    )
}

export { OrdenMisionForm as default };