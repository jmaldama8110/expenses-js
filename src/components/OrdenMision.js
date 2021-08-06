import React, { useEffect } from 'react';
import {Link } from 'react-router-dom';


const OrdenMision = () => {
    useEffect(() => {
        const tabs = document.querySelectorAll('[data-tab-target]');
        const tabContents = document.querySelectorAll('[data-tab-content]')
        
        tabs.forEach( (tab)=>{
            tab.addEventListener('click', ()=>{
                const target = document.querySelector(tab.dataset.tabTarget);
                tabContents.forEach( tabContent => tabContent.classList.remove('active'))
                tabs.forEach( tab => tab.classList.remove('active'))
                target.classList.add('active');
                tab.classList.add('active');
            })
        })
    }, []);

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
                    <label for="aereo">Aéreo</label>

                    <input type="radio" id="autobus" name="transporte" value="autobus" />
                    <label for="autobus">Autobus</label>

                    <input type="radio" id="auto" name="transporte" value="auto" />
                    <label for="auto">Automóvil</label><br/><br/>

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
                        <div id="alimentos-tab" data-tab-content className="active">
                            <h1>Alimentos</h1>
                            <p></p>
                        </div>
                        <div id="transporte-tab" data-tab-content>
                            <h1>Transporte</h1>
                        </div>
                        <div id="hospedaje-tab" data-tab-content>
                            <h1>Hospedaje</h1>
                        </div>
                        <div id="otro-tab" data-tab-content>
                            <h1>Otros</h1>
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
                    <Link className='btn btn-primary'>Elegir</Link><p></p>
                </div>
            </div>

        </div>
    );
}

export default OrdenMision;
