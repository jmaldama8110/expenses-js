import React from "react";
import { Link } from "react-router-dom";
import PagoInfocliente from './PagoInfocliente';
import PagoMetodopago from './PagoMetodopago';

const Pago = ()=> {
    return (
        <div>
            <h2>Pagos y facturacion</h2>
            <p>Deserunt laboris quis nulla labore nulla ipsum officia incididunt Lorem tempor magna. Tempor aliquip Lorem nostrud nostrud duis aliqua exercitation et dolore et ad. Dolore velit ipsum ea ut.Tempor ipsum incididunt commodo ut duis.Id in velit duis nisi exercitation commodo. Consequat occaecat aliqua consequat commodo ea ipsum cillum elit cillum fugiat nisi non consectetur consectetur. </p>
            <PagoInfocliente />
            <PagoMetodopago />

            <Link to='#' className='btn btn-primary'>Guardar</Link><p></p>

        </div>
    );
}

export { Pago as default };