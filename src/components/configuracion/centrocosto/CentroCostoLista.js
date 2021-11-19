import React,{ useContext } from "react";
import CentroCostoItem from './CentroCostoItem';

import ExpensesContext from '../../../context/ExpensesContext';;

const CentroCostoLista = () => {

    const { centroscosto } = useContext(ExpensesContext)

    return (
        <div>
            <div className="gridflex">

                <p className="headerlabel">codigo</p>
                <p className="headerlabel">nombre del centro</p>

            </div>    
            {
            centroscosto.map( item => 
                    <CentroCostoItem 
                    key={item._id}
                    item={item}
                /> )
            }
        </div>
    );
}

export { CentroCostoLista as default };