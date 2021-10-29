import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

import ComprobantesLista from './ComprobantesLista';

import ComprobanteAddForm from './ComprobanteAddForm';

import ComprobantesReducer from '../reducers/comprobantes';
import ExpensesContext from '../context/ExpensesContext';

const OrdenMisionComprobacion = () => {
    
    // const [folio, setFolio] = useState('');
    // const [fecha_aplicacion, setFechaAplicacion] = useState('');
    // const [empleado, setEmpleado] = useState('');
    
    // const [centro_costo, setCentroCosto] = useState('');
    // const [mision_desde, setMisionDesde] = useState('');
    // const [mision_hasta, setMisionHasta] = useState('');
    // const [via_transporte, setViaTransporte] = useState('');
    // const [descripcion, setDescripcion] = useState('');
    // const [anticipos, setAnticipos] = useState('');
    // const [gastos_total, setGastoTotal] = useState('');
    // const [saldo, setSaldo] = useState(''); 
    
    const [alimentos, dispatchAlimentos] = useReducer(ComprobantesReducer, []);
    const [transportes, dispatchTransportes] = useReducer(ComprobantesReducer, []);
    const [hospedajes, dispatchHopedaje] = useReducer( ComprobantesReducer, []);
    const [otros, dispatchOtros] = useReducer( ComprobantesReducer, []);

    useEffect(() => {

        /* Javascript Tab controls */
        let tabs = document.querySelectorAll('[data-tab-target]');
        let tabContents = document.querySelectorAll('[data-tab-content]')
        
        tabs.forEach((tab) => {
            tab.addEventListener('click',() => {

                const target = document.querySelector(tab.dataset.tabTarget);
        
                tabContents.forEach(tabContent => tabContent.classList.remove('active'))
                tabs.forEach(tab => tab.classList.remove('active'))
        
                target.classList.add('active');
                tab.classList.add('active');
        
            })
        })
        /* END - Javascript Tab controls */

        /* Carga data LocalStorage */
        const ordenmision = {
            folio: 'A100',
            fecha_aplicacion: '2021-08-10',
            empleado: 'Jaime Leonardo Lara',
            centro_costo: 'Direccion TI',
            mision_desde: '2021-08-09',
            mision_hasta: '2021-08-11',
            via_transporte: 'automovil',
            descripcion: 'supervision de mantenimiento de equipos de computo',
            anticipos: '9500',
            gastos_total: '7690',
            saldo: '1809.58',
            alimentos: [
                { folio: 'A1',fecha_aplicacion: '2021-08-10',concepto: 'DESAYUNO',fecha_comprobante: '2021-08-10',importe: '116',subtotal: '100',iva: '16',clase: 'alimentos' },
                { folio: 'A2',fecha_aplicacion: '2021-08-11',concepto: 'LUNCH',fecha_comprobante: '2021-08-10',importe: '102',subtotal: '90',iva: '16',clase: 'alimentos' },
                { folio: 'A3',fecha_aplicacion: '2021-08-12',concepto: 'COMIDA VIPS',fecha_comprobante: '2021-08-10',importe: '90',subtotal: '80',iva: '16',clase: 'alimentos' },
                { folio: 'A4',fecha_aplicacion: '2021-08-13',concepto: 'COMIDA AMBULANTE',fecha_comprobante: '2021-08-10',importe: '134',subtotal: '120',iva: '16',clase: 'alimentos' },
                { folio: 'A5',fecha_aplicacion: '2021-08-14',concepto: 'CENA',fecha_comprobante: '2021-08-10',importe: '125',subtotal: '115',iva: '16',clase: 'alimentos' },
                { folio: 'A6',fecha_aplicacion: '2021-08-15',concepto: 'DESAYUNO',fecha_comprobante: '2021-08-10',importe: '115',subtotal: '95',iva: '16',clase: 'alimentos' }
            ],
            transportes: [
                { folio: '93823',fecha_aplicacion: '2021-08-09',concepto: 'TAXI',fecha_comprobante: '2021-08-10',importe: '60',subtotal: '60',iva: '0', clase: 'transporte' },
                { folio: '10293',fecha_aplicacion: '2021-08-11',concepto: 'TAXI',fecha_comprobante: '2021-08-10',importe: '116',subtotal: '80',iva: '0', clase: 'transporte' },
                { folio: '74738',fecha_aplicacion: '2021-08-12',concepto: 'TAXI',fecha_comprobante: '2021-08-10',importe: '80',subtotal: '120',iva: '0', clase: 'transporte' },
                { folio: 'ie9235',fecha_aplicacion: '2021-08-13',concepto: 'TAXI',fecha_comprobante: '2021-08-10',importe: '100',subtotal: '100',iva: '0', clase: 'transporte' },

            ],
            hospedajes: [
                { folio: '01',fecha_aplicacion: '2021-08-10',concepto: 'SUITE JR',fecha_comprobante: '2021-08-14',importe: '650',subtotal: '550',iva: '16',clase: 'hospedaje' },
                { folio: '02',fecha_aplicacion: '2021-08-11',concepto: 'SUITE JR',fecha_comprobante: '2021-08-14',importe: '650',subtotal: '550',iva: '16',clase: 'hospedaje' },
                { folio: '03',fecha_aplicacion: '2021-08-12',concepto: 'SUITE JR',fecha_comprobante: '2021-08-14',importe: '650',subtotal: '550',iva: '16',clase: 'hospedaje' },
                { folio: '04',fecha_aplicacion: '2021-08-13',concepto: 'SUITE JR',fecha_comprobante: '2021-08-14',importe: '650',subtotal: '550',iva: '16',clase: 'hospedaje' },
                { folio: '05',fecha_aplicacion: '2021-08-14',concepto: 'SUITE JR',fecha_comprobante: '2021-08-14',importe: '650',subtotal: '550',iva: '16',clase: 'hospedaje' },

            ],
            otros: [
                { folio: '837',fecha_aplicacion: '2021-08-10',concepto: 'PROPINAS',fecha_comprobante: '2021-08-10',importe: '116',subtotal: '100',iva: '16', clase: 'otros'},
                { folio: '537',fecha_aplicacion: '2021-08-11',concepto: 'PROPINAS',fecha_comprobante: '2021-08-11',importe: '116',subtotal: '100',iva: '16', clase: 'otros'},
                { folio: '244',fecha_aplicacion: '2021-08-12',concepto: 'PROPINAS',fecha_comprobante: '2021-08-12',importe: '116',subtotal: '100',iva: '16', clase: 'otros'},
                { folio: '412',fecha_aplicacion: '2021-08-13',concepto: 'PROPINAS',fecha_comprobante: '2021-08-13',importe: '116',subtotal: '100',iva: '16', clase: 'otros'},

            ]
                
        }

        //const localData = JSON.parse(localStorage.getItem('comprobantes'))
        const localData = ordenmision;

        if (localData) {
            dispatchAlimentos({
                type: 'POPULATE_COMPROBANTES',
                comprobantes: localData.alimentos
            })

            dispatchTransportes({
                type: 'POPULATE_COMPROBANTES',
                comprobantes: localData.transportes
            })
            dispatchHopedaje({
                type: 'POPULATE_COMPROBANTES',
                comprobantes: localData.hospedajes
            });
            dispatchOtros({
                type: 'POPULATE_COMPROBANTES',
                comprobantes: localData.otros
            })

        }

    }, []);

    /* Actualiza el local storage por cada cambio en el state de reducer */
    useEffect(() => {
        //localStorage.setItem('comprobantes', JSON.stringify(comprobantes))
    }, [alimentos])

    return (
        <div>
            <div className="titulo">
                <h1>Orden de Misión</h1>
            </div>
            <div className="container">
                <div className="generales">
                    <label>Folio</label>
                    <input type="text" disabled defaultValue={"17267"}></input>
                    <label>Fecha apliación</label>
                    <input type="text" disabled defaultValue={"16/08/2021"}></input>
                    <label>Empleado</label>
                    <input type="text" disabled defaultValue={"Jaime Leonardo Lara"}></input>
                    <label>Centro de costos</label>
                    <input type="text" disabled defaultValue={"Direccion de TI"}></input>
                </div>
                <div className="mision">
                    <label>De</label>
                    <input type="text" disabled defaultValue={"17/08/2021"}></input>
                    <label>A</label>
                    <input type="text" disabled defaultValue={"18/08/2021"}></input>
                    <label>Transportación</label>
                    <input type="radio" id="aereo" name="transporte" value="aereo" />
                    <label htmlFor="aereo">Aéreo</label>

                    <input type="radio" id="autobus" name="transporte" value="autobus" />
                    <label htmlFor="autobus">Autobus</label>

                    <input type="radio" id="auto" name="transporte" value="auto" />
                    <label htmlFor="auto">Automóvil</label><br /><br />

                    <label>Descripcion de mision</label>
                    <textarea placeholder="Escriba aqui una descripcion detallada de la mision a realiza"></textarea>

                </div>
                <div className="detalle">
                    <ul className="tabs">
                        <li data-tab-target="#alimentos" className="active tab">Alimentos</li>
                        <li data-tab-target="#transporte" className="tab">Transporte</li>
                        <li data-tab-target="#hospedaje" className="tab">Hospedaje</li>
                        <li data-tab-target="#otros" className="tab">Otro</li>
                    </ul>
                    <div className="tab-content">
                        <div id="alimentos" data-tab-content className="active tabcontent">
                            <div className="tabcontent-container">
                            <ExpensesContext.Provider value={{ comprobantes: alimentos, dispatch: dispatchAlimentos }}>

                                <ComprobantesLista />
                                <ComprobanteAddForm />

                            </ExpensesContext.Provider>
                            </div>
                        </div>
                        <div id="transporte" data-tab-content className="tabcontent">
                            <div className="tabcontent-container">
                            <ExpensesContext.Provider value={{ comprobantes: transportes, dispatch: dispatchTransportes }} >
                                <ComprobantesLista />
                                <ComprobanteAddForm />
                            </ExpensesContext.Provider>
                            </div>
                        </div>
                        <div id="hospedaje" data-tab-content className="tabcontent">
                            <div className="tabcontent-container">
                            <ExpensesContext.Provider value={{comprobantes: hospedajes, dispatch: dispatchHopedaje} }>
                                <ComprobantesLista />
                                <ComprobanteAddForm />
                            </ExpensesContext.Provider>
                            </div>
                        </div>
                        <div id="otros" data-tab-content className="tabcontent">
                            <div className="tabcontent-container">
                            <ExpensesContext.Provider value={{comprobantes: otros, dispatch: dispatchOtros}}>
                                <ComprobantesLista />
                                <ComprobanteAddForm />
                            </ExpensesContext.Provider>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="resumen-general">
                    <label>Anticipos</label>
                    <input type="text" disabled defaultValue={"9,500.00"}></input>
                    <label>Gastos</label>
                    <input type="text" disabled defaultValue={"7,690.42"}></input>
                    <label>IVA</label>
                    <input type="text" disabled defaultValue={"7,690.42"}></input>
                    <label>Saldo</label>
                    <input type="text" disabled defaultValue={"1,809.58"}></input>
                    <p><span>Saldo a favor de la empresa</span></p>

                </div>
                <div className="resumen-conceptos">
                    <label>Kilometros</label>
                    <input type="text" disabled defaultValue={"9,500.00"}></input>
                    <label>Transporte</label>
                    <input type="text" disabled defaultValue={"7,690.42"}></input>
                    <label>Recepcion</label>
                    <input type="text" disabled defaultValue={"1,809.58"}></input>
                    <label>Hotel</label>
                    <input type="text" disabled defaultValue={"1,809.58"}></input>

                </div>
                <div className="resumen-otros">
                    <label>Alimentos</label>
                    <input type="text" disabled defaultValue={"9,500.00"}></input>
                    <label>Mantimiento de Vehiculos</label>
                    <input type="text" disabled defaultValue={"7,690.42"}></input>
                    <label>No deducible</label>
                    <input type="text" disabled defaultValue={"1,809.58"}></input>
                    <label>Varios</label>
                    <input type="text" disabled defaultValue={"1,809.58"}></input>

                </div>
                <div className="acciones">
                    <Link to="/">Volver</Link>
                    <Link to='#' className='btn btn-primary'>Elegir</Link><p></p>
                </div>
            </div>

        </div>
        
    );
}

export default OrdenMisionComprobacion;
