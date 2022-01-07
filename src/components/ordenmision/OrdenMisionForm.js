import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../Loader';
import { AxiosExpenseApi, diffFechaInicioFin } from '../../utils/axiosApi';
import AnticiposHome from './anticipos/AnticiposHome';
import AnticiposReducer from '../../reducers/anticipos';
import AutorizacionesReducer from '../../reducers/autorizaciones';
import ComprobantesReducer from '../../reducers/comprobantes';
import ConceptosReducer from '../../reducers/conceptos';

import ExpensesContext from '../../context/ExpensesContext';
import AutorizacionesHome from './autorizaciones/AutorizacionesHome';
import ComprobantesHome from './comprobantes/ComprobantesHome';
import ConceptosHome from './conceptos/ConceptosHome';
import OrdenMisionStats from './OrdenMisionStats';

import { formatoPesos } from '../../utils/numberFormatter';

const OrdenMisionForm = ({ onSubmit, orden }) => {

    const [loading, setLoading] = useState(false);
    const [fecha_aplicacion, setFechaAplicacion] = useState('');
    const [usuarioInfo, setUsuarioInfo] = useState('');

    const [empleadoId, setEmpleadoId] = useState('');
    const [empleado, setEmpleado] = useState('');

    const [centrocostoId, setCentroCostoId] = useState('');
    const [centrocosto, setCentroCosto] = useState('');

    const [centrosCosto, setCentrosCosto] = useState([]);
    const [usuariosEmpleados, setUsuariosEmpleados] = useState([]);
    const [esquemas, setEsquemas] = useState([]);

    const [esquemaId, setEsquemaId] = useState('');
    const [esquema, setEsquema] = useState('');

    const [fecha_desde, setFechaDesde] = useState('');
    const [fecha_hasta, setFechaHasta] = useState('');
    const [transporte, setTransporte] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [estatusId, setEstatusId] = useState("P");
    const [estatus, setEstatus] = useState("Pendiente");

    const [empresaId, setEmpresaId] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [empresas, setEmpresas] = useState([]);

    const [anticipos, dispatchAnticipos] = useReducer(AnticiposReducer, []);
    const [autorizaciones, dispatchAutorizaciones] = useReducer(AutorizacionesReducer, []);
    const [comprobantes, dispatchComprobantes] = useReducer(ComprobantesReducer, []);
    const [conceptos, dispatchConceptos] = useReducer(ConceptosReducer, []);

    const [duracion, setDuracion] = useState('0');
    const [totalDiario, setTotalDiario] = useState(0);
    const [anticipos_tope, setAnticiposTope] = useState('0');


    const Guardar = (e) => {
        e.preventDefault();

        const data = {
            empresa: [empresaId, empresa],
            fecha_aplicacion,
            empleado: [empleadoId, empleado],
            centro_costo: [centrocostoId, centrocosto],
            esquema: [esquemaId, esquema],
            fecha_desde,
            fecha_hasta,
            transporte,
            descripcion,
            anticipos,
            autorizaciones,
            comprobantes,
            conceptos,
            estatus: !orden ? ['P', 'Pendiente'] : [estatusId, estatus]
        }
        onSubmit(data);

    }



    useEffect(() => {

        let mounted = true;

        const fetchData = async () => {
            try {

                if (mounted) {
                    setLoading(true);
                    const axiosApi = AxiosExpenseApi();
                    let res = await axiosApi.get('/usuarios/yo');
                    setUsuarioInfo(res.data);

                    const empresasTmp = res.data.empresas;
                    empresasTmp.unshift(['', 'Elige empresa', true]);

                    setEmpresas(empresasTmp.filter(i => i[2] === true));

                    res = await axiosApi.get('/usuario/depto');
                    const usuariosTmp = res.data;
                    usuariosTmp.unshift({
                        _id: '',
                        nombre: 'Nombre del Empleado',
                        apellido_paterno: '',
                        apellido_materno: ''
                    })
                    /// trae unicamente usuario dentro de este mismo departamento

                    setUsuariosEmpleados(usuariosTmp);

                    if (orden) {

                        setFechaAplicacion(orden.fecha_aplicacion);
                        setDescripcion(orden.descripcion);
                        setTransporte(orden.transporte);
                        setFechaDesde(orden.fecha_desde);
                        setFechaHasta(orden.fecha_hasta);

                        if (orden.empresa) {
                            setEmpresaId(orden.empresa[0]);
                            setEmpresa(orden.empresa[1]);

                            const data = JSON.stringify({
                                _id: orden.empresa[0],
                                nombre: orden.empresa[1]
                            });
                            populateSelectList(data);

                            setEsquemaId(orden.esquema[0]);
                            setEsquema(orden.esquema[1]);

                            setCentroCostoId(orden.centro_costo[0]);
                            setCentroCosto(orden.centro_costo[1]);

                        }

                        if (orden.empleado) {
                            setEmpleadoId(orden.empleado[0]);
                            setEmpleado(orden.empleado[1]);
                        }


                        if (orden.estatus) {
                            setEstatusId(orden.estatus[0]);
                            setEstatus(orden.estatus[1]);
                        }
                        if (orden.anticipos) {
                            dispatchAnticipos({
                                type: 'POPULATE_ANTICIPOS',
                                anticipos: orden.anticipos
                            })
                        }

                        if (orden.comprobantes) {
                            dispatchComprobantes({
                                type: 'POPULATE_COMPROBANTES',
                                comprobantes: orden.comprobantes
                            })
                        }

                        if (orden.conceptos) {
                            dispatchConceptos({
                                type: 'POPULATE_CONCEPTOS',
                                conceptos: orden.conceptos
                            })
                        }

                        if (orden.autorizaciones) {
                            dispatchAutorizaciones({
                                type: 'POPULATE_AUTORIZACIONES',
                                autorizaciones: orden.autorizaciones
                            })

                        }

                    } else {
                        setEmpleadoId(usuarioInfo._id);
                        setDuracion(0);

                        /* Busca dentro de los usuarios del mismo departamento, quien tiene los niveles de autoriacion  */
                        const autA = usuariosTmp.find(i => i.nivel_autorizacion === 'A');
                        const autB = usuariosTmp.find(i => i.nivel_autorizacion === 'B');

                        if (autB) {
                            dispatchAutorizaciones({
                                type: "ADD_AUTORIZACION",
                                usuario_id: autB._id,
                                nombre_autorizador: `${autB.nombre} ${autB.apellido_paterno} ${autB.apellido_materno}`,
                                nivel_autorizacion: autB.nivel_autorizacion,
                                estatus: ['P', 'Pendiente']
                            });
                        }
                        if (autA) {
                            dispatchAutorizaciones({
                                type: "ADD_AUTORIZACION",
                                usuario_id: autA._id,
                                nombre_autorizador: `${autA.nombre} ${autA.apellido_paterno} ${autA.apellido_materno}`,
                                nivel_autorizacion: autA.nivel_autorizacion,
                                estatus: ['P', 'Pendiente']
                            });
                        }
                        /* ------------------------- */



                    }

                }
                setLoading(false);
            }
            catch (e) {
                alert(e);
            }
        }
        fetchData();

        return () => {
            mounted = false

        };
    }, [])

    useEffect(() => {

        const updateTopesDiarios = () => {

            const esquemasTmp = esquemas;
            const esquemaSelected = esquemasTmp.find(i => i._id === esquemaId);

            if (esquemaSelected) {
                setAnticiposTope( formatoPesos( parseFloat(esquemaSelected.anticipos_tope) ) );
            }

            if (!orden) {
                // llena la lista por primera vez en modo Add
                dispatchConceptos({
                    type: 'POPULATE_CONCEPTOS',
                    conceptos: []
                });

                if (esquemaSelected) {
                    dispatchConceptos({ type: 'ADD_CONCEPTO', _id: '1001', tipo_concepto: ['A', 'Alimentos'], tope_importe: esquemaSelected.alimentos_tope });
                    dispatchConceptos({ type: 'ADD_CONCEPTO', _id: '1002', tipo_concepto: ['T', 'Transporte'], tope_importe: esquemaSelected.transporte_tope });
                    dispatchConceptos({ type: 'ADD_CONCEPTO', _id: '1003', tipo_concepto: ['H', 'Hospedaje'], tope_importe: esquemaSelected.hospedaje_tope });
                    dispatchConceptos({ type: 'ADD_CONCEPTO', _id: '1004', tipo_concepto: ['M', 'Mantenimieto Vehhiculos'], tope_importe: esquemaSelected.mtto_vehiculos_tope });
                    dispatchConceptos({ type: 'ADD_CONCEPTO', _id: '1005', tipo_concepto: ['N', 'No deducibles'], tope_importe: esquemaSelected.nodeducibles_tope });
                    dispatchConceptos({ type: 'ADD_CONCEPTO', _id: '1006', tipo_concepto: ['R', 'Recepcion'], tope_importe: esquemaSelected.recepcion_tope });

                }
            }

        }

        updateTopesDiarios();


    }, [esquemas, esquemaId])

    useEffect(() => {

        const diasDuracion = 1 + diffFechaInicioFin(fecha_desde, fecha_hasta, 'hours') / 24;
        setDuracion(diasDuracion);
        updateTotalDiario(diasDuracion);


    }, [fecha_desde, fecha_hasta])

    useEffect(() => {
        const diasDuracion = 1 + diffFechaInicioFin(fecha_desde, fecha_hasta, 'hours') / 24;
        updateTotalDiario(diasDuracion);
    }, [conceptos])

    const updateTotalDiario = (diasDuracion) => {

        const listaTmp = conceptos;

        let totalDiario = 0;
        let hospedajeNoches = 0;

        listaTmp.forEach((e) => {
            totalDiario = totalDiario + parseFloat(e.tope_importe);
            if( e.tipo_concepto[0] === 'H'){
                hospedajeNoches = parseFloat( e.tope_importe );
            }
        })
        /// siempre resta el equivalente a 1 noche, de la duracion de dias
        setTotalDiario( formatoPesos( (totalDiario * diasDuracion) - hospedajeNoches) );

    }


    const populateSelectList = async (data) => {

        const axiosApi = AxiosExpenseApi();

        let res = await axiosApi.get(`/centroscosto?empresa=${data}`);
        const ccTmp = res.data;
        ccTmp.unshift({
            _id: '',
            nombre: 'Centro de costo'
        })
        setCentrosCosto(ccTmp);

        res = await axiosApi.get(`/esquemas?empresa=${data}`)
        const esquemasTmp = res.data;
        esquemasTmp.unshift({
            _id: '',
            descripcion: 'Elige Esquema'
        });

        setEsquemas(esquemasTmp);


    }

    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <form onSubmit={Guardar}>
                    <div className="generales">
                        <h3>Generales</h3>
                        <label>Fecha apliación</label>
                        <input type="date"
                            required
                            disabled={!(estatusId === 'P')}
                            value={fecha_aplicacion}
                            onChange={(e) => setFechaAplicacion(e.target.value)}
                        ></input>

                        <select
                            value={empresaId}
                            required
                            disabled={!(estatusId === 'P')}
                            onChange={async (e) => {
                                setEmpresaId(e.target.value);
                                setEmpresa(e.target.options[e.target.selectedIndex].text);

                                const data = JSON.stringify({
                                    _id: e.target.value,
                                    nombre: e.target.options[e.target.selectedIndex].text
                                });

                                populateSelectList(data);


                            }}
                        >
                            {
                                empresas.map(emp => <option
                                    key={emp[0]}
                                    value={emp[0]}
                                >{emp[1]}
                                </option>)
                            }
                        </select>


                        <select value={empleadoId}
                            required
                            disabled={!(estatusId === 'P')}
                            onChange={(e) => {
                                setEmpleadoId(e.target.value);
                                setEmpleado(e.target.options[e.target.selectedIndex].text);
                            }}>
                            {
                                usuariosEmpleados.map((usu) => <option
                                    key={usu._id}
                                    value={usu._id}
                                >{`${usu.nombre} ${usu.apellido_paterno} ${usu.apellido_materno}`}</option>)
                            }
                        </select>

                        <select value={centrocostoId}
                            required
                            disabled={!(estatusId === 'P')}
                            onChange={
                                (e) => {
                                    setCentroCostoId(e.target.value);
                                    setCentroCosto(e.target.options[e.target.selectedIndex].text);
                                }
                            }>
                            {centrosCosto.map((cc) => <option
                                key={cc._id}
                                value={cc._id}
                            >{cc.nombre}</option>)}
                        </select>

                        <select value={esquemaId}
                            required
                            disabled={!(estatusId === 'P')}
                            onChange={(e) => {

                                setEsquemaId(e.target.value);
                                setEsquema(e.target.options[e.target.selectedIndex].text);


                            }}>
                            {esquemas.map((esq) => <option
                                key={esq._id}
                                value={esq._id}
                            >{esq.descripcion}</option>)}

                        </select>

                        <select value={estatusId}
                            disabled
                            onChange={(e) => {
                                setEstatusId(e.target.value);
                                setEstatus(e.target.options[e.target.selectedIndex].text);
                            }}>
                            <option value="P">Pendiente</option>
                            <option value="A">Autorizada</option>
                            <option value="R">En Revision</option>
                            <option value="V">Vencida</option>
                            <option value="F">Finalizada</option>
                            <option value="C">Cancelada</option>
                        </select>

                    </div>
                    <div className="mision">
                        <h3>Destino y fechas</h3>
                        <label>De</label>
                        <input type="date"
                            required
                            disabled={!(estatusId === 'P')}
                            value={fecha_desde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        ></input>
                        <label>A</label>
                        <input type="date"
                            required
                            disabled={!(estatusId === 'P')}
                            value={fecha_hasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        ></input>

                        <label>Transporte</label>

                        <input id="aereo"
                            type="radio"
                            name="transporte"
                            value="aereo"
                            checked={transporte === 'aereo'}
                            disabled={!(estatusId === 'P')}
                            onChange={(e) => setTransporte(e.target.value)}
                        />
                        <label htmlFor="aereo">Aéreo</label>

                        <input type="radio"
                            id="autobus"
                            name="transporte"
                            value="autobus"
                            checked={transporte === 'autobus'}
                            disabled={!(estatusId === 'P')}
                            onChange={(e) => setTransporte(e.target.value)}
                        />
                        <label htmlFor="autobus">Autobus</label>

                        <input type="radio"
                            id="auto"
                            name="transporte"
                            value="auto"
                            checked={transporte === 'auto'}
                            disabled={!(estatusId === 'P')}
                            onChange={(e) => setTransporte(e.target.value)}
                        />
                        <label htmlFor="auto">Automóvil</label><br /><br />

                        <label>Descripcion de mision</label>
                        <textarea
                            required
                            disabled={!(estatusId === 'P')}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Escriba aqui una descripcion detallada de la mision a realiza"
                        ></textarea>

                        <ExpensesContext.Provider value={{ anticipos, comprobantes, setEstatus, setEstatusId, estatusId }}>
                            { (estatusId === 'A' || estatusId === 'R' || estatusId === 'F' ) && <OrdenMisionStats />}
                        </ExpensesContext.Provider>
                        
                        <p>* Duracion de la mision: <strong>{duracion}</strong> dias
                        + Anticipo maximo: <strong>{anticipos_tope} </strong>
                        + Total aproximado a ejercer: <strong>{totalDiario}</strong></p>
                        <ExpensesContext.Provider value={{ estatusId, conceptos, dispatchConceptos }}>
                            <ConceptosHome />
                        </ExpensesContext.Provider>
                        
                        <ExpensesContext.Provider value={{ anticipos, dispatchAnticipos }}>
                            { estatusId ==='A' && <AnticiposHome />}
                        </ExpensesContext.Provider> 

                        <ExpensesContext.Provider value={{ comprobantes, dispatchComprobantes, estatusId }}>
                            { (estatusId ==='A' || estatusId ==='R') && <ComprobantesHome />}
                        </ExpensesContext.Provider>

                        <ExpensesContext.Provider value={{ autorizaciones, estatusId,estatus,usuarioInfo, dispatchAutorizaciones }}>
                            <AutorizacionesHome />
                        </ExpensesContext.Provider>


                    </div>
                    {   ( estatusId === 'P' || estatusId === 'A' || estatusId === 'F') &&
                        <button>Guardar</button>}
                    <Link to="/">Cancelar</Link>

                </form>}
        </div>
    )
}

export { OrdenMisionForm as default };