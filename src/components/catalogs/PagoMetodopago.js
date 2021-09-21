import React from "react";


const PagoMetodopago = ()=> {
    return (
        <div>
            <h3>Datos de la Tarjeta</h3>
                <input type="text" placeholder="Nombre completo (como aparece en el plastico)"></input>
                <input type="text" placeholder="Numero de Tarjeta"></input>
                <input type="text" placeholder="VISA / Mastercard / American Express"></input>
                <input type="text" placeholder="Vencimiento"></input>
                <input type="text" placeholder="Codigo de Seguridad"></input>
        </div>
    );
}

export { PagoMetodopago as default };