import React, { useEffect,useReducer } from 'react';
import { Link } from 'react-router-dom';

import ComprobantesLista from './ComprobantesLista';

import comprobantesReducer from '../reducers/comprobantes';
import ComprobanteAddForm from './ComprobanteAddForm';

import ComprobantesContext from '../context/comprobantesContext';


const OrdenMision = () => {

    
    const [comprobantes, dispatch] = useReducer(comprobantesReducer, []);
    
    useEffect(() => {
        const tabs = document.querySelectorAll('[data-tab-target]');
        const tabContents = document.querySelectorAll('[data-tab-content]')
        
        let tab_selected = 'alimentos-tab'
        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {

                const target = document.querySelector(tab.dataset.tabTarget);

                tabContents.forEach(tabContent => tabContent.classList.remove('active'))
                tabs.forEach(tab => tab.classList.remove('active'))

                target.classList.add('active');
                tab.classList.add('active');

                tab_selected = target.id
                
            })
        })

        /* Carga data LocalStorage */
        const ordenmision = {
            folio: 'A100',
            fecha_aplicacion: '2021-08-10',
            empleado: 'Jaime Leonardo Lara',
            centro_costo: 'Direccion TI',
            mision_desde: '2021-08-09',
            mision_hasta: '2021-08-11',
            transportacion: 'automovil',
            descripcio: 'supervision de mantenimiento de equipos de computo',
            anticipos: '9500',
            gastos_total: '7690',
            saldo: '1809.58',
            comprobantes: [
                {
                    folio: '1',
                    fecha_aplicacion: '2021-08-10',
                    concepto: 'ALIMENTOS',
                    fecha_comprobante: '2021-08-10',
                    importe: '116',
                    subtotal: '100',
                    iva: '16',
                    clase: 'alimentos'
                },
                {
                    folio: '2',
                    fecha_aplicacion: '2021-08-10',
                    concepto: 'TAXI',
                    fecha_comprobante: '2021-08-10',
                    importe: '116',
                    subtotal: '100',
                    iva: '16',
                    clase: 'transporte'
                },
                {
                    folio: '3',
                    fecha_aplicacion: '2021-08-10',
                    concepto: 'SUITE JR',
                    fecha_comprobante: '2021-08-10',
                    importe: '116',
                    subtotal: '100',
                    iva: '16',
                    clase: 'hospedaje'
                },
                {
                    folio: '4',
                    fecha_aplicacion: '2021-08-10',
                    concepto: 'PROPINAS',
                    fecha_comprobante: '2021-08-10',
                    importe: '116',
                    subtotal: '100',
                    iva: '16',
                    clase: 'otro'
                }
            ]
        }

        //const comprobantesData = JSON.parse(localStorage.getItem('comprobantes'))
        const comprobantesData = ordenmision.comprobantes

        if (comprobantesData) {
            dispatch({
                type: 'POPULATE_COMPROBANTES',
                comprobantes: comprobantesData
            })
        }

    }, []);

    /* Actualiza el local storage por cada cambio en el state de reducer */
    useEffect(() => {
        localStorage.setItem('comprobantes', JSON.stringify(comprobantes))
    }, [comprobantes])

    return (
        <ComprobantesContext.Provider value={{ comprobantes, dispatch }}>
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
                        <li data-tab-target="#alimentos-tab" className="active tab">Alimentos</li>
                        <li data-tab-target="#transporte-tab" className="tab">Transporte</li>
                        <li data-tab-target="#hospedaje-tab" className="tab">Hospedaje</li>
                        <li data-tab-target="#otro-tab" className="tab">Otro</li>
                    </ul>
                    <div className="tab-content">
                        <div id="alimentos-tab" data-tab-content className="active tabcontent">

                            <div className="tabcontent-container">
                                <ComprobantesLista />
                                <ComprobanteAddForm />
                            </div>
                        </div>
                        <div id="transporte-tab" data-tab-content className="tabcontent">
                            <div className="tabcontent-container">
                                <div className="comprobantes-header gridcontent">
                                    <p>Folio</p>
                                    <p>Fecha Aplicación</p>
                                    <p>Concepto</p>
                                    <p>Fecha Comprobante</p>
                                    <p>Importe</p>
                                    <p>Subototal</p>
                                    <p>IVA</p>
                                </div>
                                <div className="comprobantes-list">
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>13456S</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>TAXI A HOTEL</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$150.0</p></div>
                                        <div><p>$129.31</p></div>
                                        <div><p>$20.68</p></div>
                                    </div>
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>23567</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>AEROPUERTO</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$116.0</p></div>
                                        <div><p>$100</p></div>
                                        <div><p>$16.0</p></div>
                                    </div>
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>C100BC</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>TAXI OFICINA</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$150.0</p></div>
                                        <div><p>$129.31</p></div>
                                        <div><p>$20.68</p></div>
                                    </div>
                                </div>
                                <div className="comprobantes-form gridcontent">
                                    <div><input type="text" placeholder="folio.." defaultValue="1234"></input></div>
                                    <div><input type="text" placeholder="Fecha aplicacion.." defaultValue="20-Ago"></input></div>
                                    <div><input type="text" placeholder="Concepto.." defaultValue="TAXI"></input></div>
                                    <div><input type="text" placeholder="Fecha comprobante.." defaultValue="22-Ago"></input></div>
                                    <div><input type="text" placeholder="Importe.." defaultValue="$120.0"></input></div>
                                    <div><input type="text" placeholder="Subtotal.." defaultValue="$103.44"></input></div>
                                    <div><input type="text" placeholder="IVA.." defaultValue="$16.55"></input></div>

                                </div>
                            </div>
                        </div>
                        <div id="hospedaje-tab" data-tab-content className="tabcontent">
                            <div className="tabcontent-container">
                                <div className="comprobantes-header gridcontent">
                                    <p>Folio</p>
                                    <p>Fecha Aplicación</p>
                                    <p>Concepto</p>
                                    <p>Fecha Comprobante</p>
                                    <p>Importe</p>
                                    <p>Subototal</p>
                                    <p>IVA</p>
                                </div>
                                <div className="comprobantes-list">
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>A100BC</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>SUIT BASICA</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$750.0</p></div>
                                        <div><p>$129.31</p></div>
                                        <div><p>$20.68</p></div>
                                    </div>
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>A10003</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>SUIT BASICA</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$750.0</p></div>
                                        <div><p>$100</p></div>
                                        <div><p>$16.0</p></div>
                                    </div>
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>A100BC</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>SUIT BASICA</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$750.0</p></div>
                                        <div><p>$129.31</p></div>
                                        <div><p>$20.68</p></div>
                                    </div>
                                </div>
                                <div className="comprobantes-form gridcontent">
                                    <div><input type="text" placeholder="folio.." defaultValue="B237SB"></input></div>
                                    <div><input type="text" placeholder="Fecha aplicacion.." defaultValue="21-Ago"></input></div>
                                    <div><input type="text" placeholder="Concepto.." defaultValue="HOTEL"></input></div>
                                    <div><input type="text" placeholder="Fecha comprobante.." defaultValue="22-Ago"></input></div>
                                    <div><input type="text" placeholder="Importe.." defaultValue="$720.0"></input></div>
                                    <div><input type="text" placeholder="Subtotal.." defaultValue="$103.44"></input></div>
                                    <div><input type="text" placeholder="IVA.." defaultValue="$16.55"></input></div>

                                </div>
                            </div>

                        </div>
                        <div id="otro-tab" data-tab-content="tabcontent" className="tabcontent">
                            <div className="tabcontent-container">
                                <div className="comprobantes-header gridcontent">
                                    <p>Folio</p>
                                    <p>Fecha Aplicación</p>
                                    <p>Concepto</p>
                                    <p>Fecha Comprobante</p>
                                    <p>Importe</p>
                                    <p>Subototal</p>
                                    <p>IVA</p>
                                </div>
                                <div className="comprobantes-list">
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>01</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>PROPINAS</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$20.0</p></div>
                                        <div><p>$0</p></div>
                                        <div><p>$0</p></div>
                                    </div>
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>02</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>PROPINAS</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$20.0</p></div>
                                        <div><p>$0</p></div>
                                        <div><p>$0</p></div>
                                    </div>
                                    <div className="comprobantes-item gridcontent">
                                        <div><p>03</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>PARQUIMETRO</p></div>
                                        <div><p>21-Ago</p></div>
                                        <div><p>$20.0</p></div>
                                        <div><p>$0</p></div>
                                        <div><p>$0</p></div>
                                    </div>
                                </div>
                                <div className="comprobantes-form">
                                    <form className="gridcontent">
                                        <div><input type="text" placeholder="folio.." defaultValue="001"></input></div>
                                        <div><input type="text" placeholder="Fecha aplicacion.." defaultValue="21-Ago"></input></div>
                                        <div><input type="text" placeholder="Concepto.." defaultValue=""></input></div>
                                        <div><input type="text" placeholder="Fecha comprobante.." defaultValue="22-Ago"></input></div>
                                        <div><input type="text" placeholder="Importe.." defaultValue=""></input></div>
                                        <div><input type="text" placeholder="Subtotal.." defaultValue=""></input></div>
                                        <div><input type="text" placeholder="IVA.." defaultValue=""></input></div>
                                    </form>

                                </div>
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
        </ComprobantesContext.Provider>
    );
}

export default OrdenMision;
