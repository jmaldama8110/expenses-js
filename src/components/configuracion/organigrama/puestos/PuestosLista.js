import React,{useContext} from "react";
import PuestosItem from './PuestosItem';

import ExpensesContext from "../../../../context/ExpensesContext";

const PuestosLista = () => {

    const { puestos } = useContext(ExpensesContext);

    return (
        <div>
            <div className="gridflex">
                <p className="headerlabel">id</p>
                <p className="headerlabel">titulo</p>
                <p className="headerlabel">Jefe Inmediato</p>
                <p className="headerlabel">Departamento</p>
                <p className="headerlabel">Usuario</p>

            </div>
            {
            puestos.map( puesto => 
                    <PuestosItem 
                        key={puesto._id}
                        puesto={puesto}
                    /> )
            }
        </div>
    );
}

export { PuestosLista as default };