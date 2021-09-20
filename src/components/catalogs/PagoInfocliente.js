import React from "react";


const PagoInfocliente = ()=> {
    return (
        <div>
            <h2>Datos de facturacion</h2>
                <p> Qui ad ad officia non aute ad laboris occaecat fugiat enim nostrud enim excepteur cupidatat.
                    Aliqua amet cillum dolore incididunt ut eu anim in qui.Aute fugiat commodo sint laborum officia sit mollit laboris eiusmod.
                    
                </p>

                <input type="text" placeholder="Razon social"></input>
                <input type="text" placeholder="RFC"></input>
                <input type="text" placeholder="Direccion"></input>
                <input type="text" placeholder="Estado"></input>
                <input type="text" placeholder="Codigo postal"></input>
                <input type="text" placeholder="Uso de CFDI"></input>
                <input type="text" placeholder="Telefono"></input>
                <input type="email" placeholder="Correo Electronico"></input>



        
        </div>
    );
}

export { PagoInfocliente as default };