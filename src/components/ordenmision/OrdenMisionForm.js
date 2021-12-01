import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../Loader';
import { AxiosExpenseApi, getUsuarioSession } from '../../utils/axiosApi';
import AnticiposHome from './anticipos/AnticiposHome';
import AnticiposReducer from '../../reducers/anticipos';
import AutorizacionesReducer from '../../reducers/autorizaciones';

import ExpensesContext from '../../context/ExpensesContext';
import AutorizacionesHome from './autorizaciones/AutorizacionesHome';

const OrdenMisionForm = ( { onSubmit, orden} )=> {


    const [loading, setLoading] = useState(false);
    const [fecha_aplicacion, setFechaAplicacion] = useState('');

    const [empleadoId, setEmpleadoId] = useState('');
    const [empleado, setEmpleado] = useState('');

    const [centrocostoId, setCentroCostoId] = useState('');
    const [centrocosto, setCentroCosto] = useState('');

    const [centrosCosto, setCentrosCosto] = useState([]);
    const [usuariosEmpleados, setUsuariosEmpleados ] = useState([]);

    const [esquemaId, setEsquemaId] = useState('');
    const [esquema, setEsquema] = useState('');

    const [fecha_desde, setFechaDesde] = useState('');
    const [fecha_hasta, setFechaHasta] = useState('');
    const [transporte, setTransporte ] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [estatusId, setEstatusId] = useState("");
    const [estatus, setEstatus] = useState("");

    const [ anticipos, dispatchAnticipos ] = useReducer(AnticiposReducer, []);
    const [ autorizaciones, dispatchAutorizaciones ] = useReducer( AutorizacionesReducer, []);


    const Guardar = (e)=> {
        e.preventDefault();

        const data = {
            fecha_aplicacion,
            empleado:[ empleadoId, empleado ],
            centro_costo: [centrocostoId, centrocosto],
            esquema: [esquemaId, esquema],
            fecha_desde,
            fecha_hasta,
            transporte,
            descripcion,
            anticipos,
            autorizaciones,
            estatus: !orden ? ['P','Pendiente'] : [estatusId,estatus]
        }
        onSubmit(data);

    }


    useEffect( ()=> {

        let mounted = true;

        const fetchData = async () => {
            try {
                
                if( mounted ){
                    
                    setLoading(true);
                    const axiosApi = AxiosExpenseApi();
                    const res = await axiosApi.get('/centroscosto');
                    const cc = res.data;
                    cc.unshift({
                        _id: "",
                        nombre: "Centro de Costo"
                    });
                    setCentrosCosto(cc);

                    const uss = await axiosApi.get('/usuarios');

                    /// trae unicamente usuario dentro de este mismo departamento
                    const currentDepto = getUsuarioSession().info.depto[0];
                    if( currentDepto ){
                        setUsuariosEmpleados(uss.data.filter( i => i.depto[0] === currentDepto ));
                    }
                    
                    if(orden){
                        /// EDIT orden has been called
                        setFechaAplicacion(orden.fecha_aplicacion);
                        setDescripcion(orden.descripcion);
                        setTransporte(orden.transporte);
                        setFechaDesde(orden.fecha_desde);
                        setFechaHasta(orden.fecha_hasta);
             
                        if( orden.empleado ){
                            setEmpleadoId(orden.empleado[0]);
                            setEmpleado(orden.empleado[1]);    
                        }
             
                        if( orden.esquema){
                            setEsquemaId(orden.esquema[0]);
                            setEsquema(orden.esquema[1]);    
                        }
                        if( orden.centro_costo){
                            setCentroCostoId(orden.centro_costo[0]);
                            setCentroCosto(orden.centro_costo[1]);    
                        }
                        
                        if( orden.estatus){
                            setEstatusId( orden.estatus[0]);
                            setEstatus(orden.estatus[1]);    
                        }
                        if( orden.anticipos) {
                            dispatchAnticipos({
                                type: 'POPULATE_ANTICIPOS',
                                anticipos: orden.anticipos
                            })
                        }

                        if( orden.autorizaciones ){
                            dispatchAutorizaciones({
                                type: 'POPULATE_AUTORIZACIONES',
                                autorizaciones: orden.autorizaciones
                            })
                        }
             
                    } else {

                        //// NUEVA orden has been called
                        const usu = getUsuarioSession();
                        setEmpleadoId( usu.info._id );
                        setEmpleado(`${usu.info.nombre} ${usu.info.apellido_paterno} ${usu.info.apellido_materno}`);

                        const ussTmp = await axiosApi.get('/usuarios');

                        const autA = ussTmp.data.find( i => i.nivel_autorizacion === 'A');
                        const autB = ussTmp.data.find( i => i.nivel_autorizacion === 'B');

                        if( autB ){
                            dispatchAutorizaciones({
                                type: "ADD_AUTORIZACION",
                                usuario_id: autB._id,
                                nombre_autorizador: `${autB.nombre} ${autB.apellido_paterno} ${autB.apellido_materno}`,
                                nivel_autorizacion: autB.nivel_autorizacion,
                                estatus: [ 'P', 'Pendiente']
                            });
                        }
                        if( autA ){
                            dispatchAutorizaciones({
                                type: "ADD_AUTORIZACION",
                                usuario_id: autA._id,
                                nombre_autorizador: `${autA.nombre} ${autA.apellido_paterno} ${autA.apellido_materno}`,
                                nivel_autorizacion: autA.nivel_autorizacion,
                                estatus: [ 'P', 'Pendiente']
                            });
                        }

                    }
                setLoading(false);
                }
            }
            catch(e){
                alert(e);
            }
        }
        fetchData();

        return () => {
            mounted = false
            
        };
    },[])

    return (
        <div>
        { loading && <Loader /> }
        { !loading &&
            <form onSubmit={Guardar}>
                    <div className="generales">
                        <h3>Generales</h3>
                        <label>Fecha apliación</label>
                            <input  type="date"
                                    required
                                    value={fecha_aplicacion}
                                    onChange={ (e)=> setFechaAplicacion(e.target.value)}
                            ></input>

                        <select     value={empleadoId}
                                    required
                                    onChange={ (e)=> {
                                        setEmpleadoId(e.target.value);
                                        setEmpleado(e.target.options[e.target.selectedIndex].text);
                                    } }>
                                {
                                usuariosEmpleados.map( (usu) => <option
                                                                        key={usu._id}
                                                                        value={usu._id}
                                                                    >{`${usu.nombre} ${usu.apellido_paterno} ${usu.apellido_materno}` }</option>)
                                }
                        </select>

                        <select     value={centrocostoId}
                                    required
                                    onChange={ 
                                        (e)=> {
                                            setCentroCostoId(e.target.value);
                                            setCentroCosto(e.target.options[e.target.selectedIndex].text);
                                        }
                                    }>
                                    { centrosCosto.map( (cc) => <option
                                                                    key={cc._id}
                                                                    value={cc._id}
                                                                >{cc.nombre}</option>) }
                        </select>

                        <select     value={esquemaId}                                onChange={ (e)=> {
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
                        <h3>Destino y fechas</h3>
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
                        
                        <div>
                            <ExpensesContext.Provider value= {{ anticipos, dispatchAnticipos }}>
                                <AnticiposHome />
                            </ExpensesContext.Provider>

                        </div>
                        <div>
                            <ExpensesContext.Provider value= {{autorizaciones, dispatchAutorizaciones}}>
                                <AutorizacionesHome />
                            </ExpensesContext.Provider>
                        </div>
                    
                    </div>
                        <button>Guardar</button>         
                    <Link to="/">Cancelar</Link>

            </form>}
        </div>
    )
}

export { OrdenMisionForm as default };