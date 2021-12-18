import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../Loader';
import { AxiosExpenseApi, diffFechaInicioFin } from '../../utils/axiosApi';
import AnticiposHome from './anticipos/AnticiposHome';
import AnticiposReducer from '../../reducers/anticipos';
import AutorizacionesReducer from '../../reducers/autorizaciones';
import ComprobantesReducer from '../../reducers/comprobantes';

import ExpensesContext from '../../context/ExpensesContext';
import AutorizacionesHome from './autorizaciones/AutorizacionesHome';
import ComprobantesHome from './comprobantes/ComprobantesHome';

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

    const [estatusId, setEstatusId] = useState("");
    const [estatus, setEstatus] = useState("");

    const [empresaId, setEmpresaId] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [empresas, setEmpresas] = useState([]);

    const [anticipos, dispatchAnticipos] = useReducer(AnticiposReducer, []);
    const [autorizaciones, dispatchAutorizaciones] = useReducer(AutorizacionesReducer, []);
    const [comprobantes, dispatchComprobantes] = useReducer(ComprobantesReducer, []);

    const [duracion, setDuracion] = useState('0');
    const [alimentos_tope, setAlimentosTope] = useState('0');
    const [anticipos_tope, setAnticiposTope] = useState('0');
    const [hospedaje_tope, setHospedajeTope] = useState('0');
    const [transporte_tope, setTransporteTope] = useState('0');
    const [nodeducibles_tope, setNodeduciblesTope] = useState('0');
    const [recepcion_tope, setRecepcionTope] = useState('0');
    const [mtto_vehiculos_tope, setMttoVehiculosTope] = useState('0');


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
                setAlimentosTope(esquemaSelected.alimentos_tope);

                setAnticiposTope(esquemaSelected.anticipos_tope);
                setHospedajeTope(esquemaSelected.hospedaje_tope);
                setMttoVehiculosTope(esquemaSelected.mtto_vehiculos_tope);
                setNodeduciblesTope(esquemaSelected.nodeducibles_tope);
                setRecepcionTope(esquemaSelected.recepcion_tope);
                setTransporteTope(esquemaSelected.transporte_tope);

            }

        }

        updateTopesDiarios();

    }, [esquemas, esquemaId])

    useEffect(() => {

        setDuracion(1 + diffFechaInicioFin(fecha_desde, fecha_hasta, 'hours') / 24);

    }, [fecha_desde, fecha_hasta])

    const getTotalPorDia = () => {
        return ((
            parseFloat(alimentos_tope) +
            parseFloat(transporte_tope) +
            parseFloat(hospedaje_tope) +
            parseFloat(recepcion_tope) +
            parseFloat(mtto_vehiculos_tope) +
            parseFloat(nodeducibles_tope)
        ) * duracion)
            - parseFloat(hospedaje_tope); // menos un dia de hospedaje

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
                            value={fecha_aplicacion}
                            onChange={(e) => setFechaAplicacion(e.target.value)}
                        ></input>

                        <select
                            value={empresaId}
                            required
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
                            value={fecha_desde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        ></input>
                        <label>A</label>
                        <input type="date"
                            required
                            value={fecha_hasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        ></input>

                        <label>Transporte</label>

                        <input id="aereo"
                            type="radio"
                            name="transporte"
                            value="aereo"
                            checked={transporte === 'aereo'}
                            onChange={(e) => setTransporte(e.target.value)}
                        />
                        <label htmlFor="aereo">Aéreo</label>

                        <input type="radio"
                            id="autobus"
                            name="transporte"
                            value="autobus"
                            checked={transporte === 'autobus'}
                            onChange={(e) => setTransporte(e.target.value)}
                        />
                        <label htmlFor="autobus">Autobus</label>

                        <input type="radio"
                            id="auto"
                            name="transporte"
                            value="auto"
                            checked={transporte === 'auto'}
                            onChange={(e) => setTransporte(e.target.value)}
                        />
                        <label htmlFor="auto">Automóvil</label><br /><br />

                        <label>Descripcion de mision</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Escriba aqui una descripcion detallada de la mision a realiza"
                        ></textarea>
                        <h3>Resumen & condiciones</h3>
                        <p>Duracion de la mision: <strong>{duracion}</strong> dias</p>
                        <p>Anticipo maximo: <strong>{anticipos_tope}</strong></p>
                        <h4>Cuota por dia:</h4>
                        {alimentos_tope !== '0' &&
                            <p>
                                <button onClick={e => { e.preventDefault(); setAlimentosTope('0') }}>x</button>
                                + Alimentos: <strong>{alimentos_tope}</strong>
                            </p>}
                        {transporte_tope !== '0' &&
                            <p>
                                <button onClick={e => { e.preventDefault(); setTransporteTope('0') }}>x</button>
                                + Transporte: <strong>{transporte_tope}</strong>
                            </p>}
                        {hospedaje_tope !== '0' &&
                            <p>
                                <button onClick={e => { e.preventDefault(); setHospedajeTope('0') }}>x</button>
                                + Hospedaje ({duracion - 1} noches): <strong>{hospedaje_tope}</strong>
                            </p>}
                        {recepcion_tope !== '0' &&
                            <p>
                                <button onClick={e => { e.preventDefault(); setRecepcionTope('0') }}>x</button>
                                + Recepcion: <strong>{recepcion_tope}</strong>
                            </p>}
                        {mtto_vehiculos_tope !== '0' &&
                            <p>
                                <button onClick={e => { e.preventDefault(); setMttoVehiculosTope('0') }}>x</button>
                                + Mtto Vehiculos: <strong>{mtto_vehiculos_tope}</strong>
                            </p>}
                        {nodeducibles_tope !== '0' &&
                            <p>
                                <button onClick={e => { e.preventDefault(); setNodeduciblesTope('0') }}>x</button>
                                + No deducibles: <strong>{nodeducibles_tope}</strong>
                            </p>}
                        <p>Total: <strong>{getTotalPorDia()}</strong></p>

                        <div>
                            <ExpensesContext.Provider value={{ anticipos, dispatchAnticipos }}>
                                <AnticiposHome />
                            </ExpensesContext.Provider>

                        </div>
                        <div>
                            <ExpensesContext.Provider value={{ autorizaciones, usuarioInfo, dispatchAutorizaciones }}>
                                <AutorizacionesHome />
                            </ExpensesContext.Provider>

                        </div>
                        <div>
                            <ExpensesContext.Provider value={{ comprobantes, dispatchComprobantes }}>
                                <ComprobantesHome />
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