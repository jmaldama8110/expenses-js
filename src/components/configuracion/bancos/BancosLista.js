import React,{useContext} from "react";
import BancosItem from "./BancosItem";

import ExpensesContext from '../../../context/ExpensesContext';

const BancosLista = () => {

    const { bancos } = useContext(ExpensesContext);

    return (
        <div>
            <div className="gridflex">
                <p className="headerlabel">id</p>
                <p className="headerlabel">Numero Cuenta</p>
                <p className="headerlabel">CLABE</p>
                <p className="headerlabel">Banco</p>


            </div>
            {
            bancos.map( banco => 
                    <BancosItem 
                        key={banco._id}
                        banco={banco}
                    /> )
            }
        </div>
    );
}

export { BancosLista as default };