import React,{ useContext } from "react";
import VariosItem from './VariosItem';

import ExpensesContext from '../../../context/ExpensesContext';;

const VariosLista = () => {

    const { varios } = useContext(ExpensesContext)

    return (
        <div>
            <div className="gridflex">

                <p className="headerlabel">Descripcion</p>
                <p className="headerlabel">Cuenta / Subcuenta</p>
                <p className="headerlabel">Empresa</p>

            </div>    
            {
            varios.map( item => 
                    <VariosItem 
                    key={item._id}
                    item={item}
                /> )
            }
        </div>
    );
}

export { VariosLista as default };