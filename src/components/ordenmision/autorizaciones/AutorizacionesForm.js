
import React from "react";

const AutorizacionesForm = () => {

    const onAutorizar = (e) => {
        e.preventDefault();

        alert('Autorizar aqui!');
    }

    return (
        <div>
            <p> Correo
                <input
                    type="text"
                ></input>
            </p>
            <p> Password
                <input
                    type="password"
                ></input>
            </p>
            <button onClick={onAutorizar}>Autorizar</button>
        </div>
    );
}

export { AutorizacionesForm as default };