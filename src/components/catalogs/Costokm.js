import React from "react";

const Costokm = () => {
    return (
        <div>
            <h2>Cuota de pago por kilometraje</h2> 
            <p> Aliquip labore aliquip fugiat minim aute in proident. Eu id minim labore nostrud occaecat laborum ad anim excepteur culpa irure non quis reprehenderit.</p>
            <form>
                <label>Importe pagado por cada kilometro recorrido</label>
                <input type="text" defaultValue='$5.0'></input>
            </form>
        </div>
    );
}

export { Costokm as default };