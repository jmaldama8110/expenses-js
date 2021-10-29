import React from 'react';
import { Link } from 'react-router-dom';

const Esquemas = () => {

    const esquemas = [
        {
            id: 'E01',
            nombre_esquema: 'SOFOM PROMOTORES', anticipos: {
                cargo: '12500', abono: '127001', titulo:'JUAN LOPEZ'
            },transporte: {
                cargo: '42056', abono: '100001', titulo: 'TRANSPORTE'            
            },recepcion: {
                cargo: '42056', abono: '100002', titulo: 'CASETAS' 
            },hospedaje: {
                cargo: '42056', abono: '100003', titulo: 'GASTOS DE HOSPEDAJE'       
            },alimentos: {
                cargo: '42056', abono: '100004', titulo: 'GASTOS DE ALIMENTOS'     
            },mantenimiento_vehiculos: {
                cargo: '50043', abono: '100002', titulo: 'TSURU'         
            },no_deducibles: {
                cargo: '42062', abono: '0', titulo: 'GASTOS NO DEDUCIBLES' 
            },iva: {
                cargo: '14500', abono: '1001001', titulo: 'IVA ACREDITABLE 16%' 
            }

        },
        {
            id: 'E02',
            nombre_esquema: 'DIRECTIVOS', anticipos: {
                cargo: '12500', abono: '127001', titulo:'JUAN LOPEZ'
            },transporte: {
                cargo: '42056', abono: '100001', titulo: 'TRANSPORTE'            
            },recepcion: {
                cargo: '42056', abono: '100002', titulo: 'CASETAS' 
            },hospedaje: {
                cargo: '42056', abono: '100003', titulo: 'GASTOS DE HOSPEDAJE'       
            },alimentos: {
                cargo: '42056', abono: '100004', titulo: 'GASTOS DE ALIMENTOS'     
            },mantenimiento_vehiculos: {
                cargo: '50043', abono: '100002', titulo: 'TSURU'         
            },no_deducibles: {
                cargo: '42062', abono: '0', titulo: 'GASTOS NO DEDUCIBLES' 
            },iva: {
                cargo: '14500', abono: '1001001', titulo: 'IVA ACREDITABLE 16%' 
            }

        },

    ]
    return (
        <div>
            <h2>Esquemas Contables</h2>
            <p> Consectetur veniam aliqua eu dolore nostrud elit voluptate ea cupidatat consequat pariatur irure in officia. Ea ex deserunt laboris pariatur fugiat dolor non. Nulla minim irure ipsum in laborum enim sint nulla non.</p>
            <div className="tableheader">
                <p>Clave</p>
                <p>Nombre Esquema</p>
                <p>Cuentas contables</p>
                <p>Accion</p>
            </div>
            {esquemas.map(item => {
                return <div className="tablerow">
                    <p>{item.id}</p>
                    <p>{item.nombre_esquema}</p>
                    <p> Anticipos: {item.anticipos.cargo} / {item.anticipos.abono} / {item.anticipos.titulo}<br/>
                        Transporte: {item.transporte.cargo} / {item.transporte.abono} / {item.transporte.titulo}<br/>
                        Recepcion: {item.recepcion.cargo} / {item.recepcion.abono} / {item.recepcion.titulo}<br/>
                        Hospedaje: {item.hospedaje.cargo} / {item.hospedaje.abono} / {item.hospedaje.titulo}<br/>
                        Alimentos: {item.alimentos.cargo} / {item.alimentos.abono} / {item.alimentos.titulo}<br/>
                        Mantenimiento de vehiculos: {item.mantenimiento_vehiculos.cargo} / {item.mantenimiento_vehiculos.abono} / {item.mantenimiento_vehiculos.titulo}
                    </p>
                    <a href="#home">Modificar</a>
                </div>

            })}
            <Link to="/home">Regresar</Link>
        </div>

    );
}

export { Esquemas as default };