import React,{useContext, useEffect} from "react";
import EsquemasItem from './EsquemasItem';

import ExpensesContext from "../../../context/ExpensesContext";

const EsquemasLista = () => {

    const { esquemas } = useContext(ExpensesContext);

    return (
        <div>
            <div className="gridflex">
                <p className="headerlabel">id</p>

            </div>
            {
            esquemas.map( esq => 
                    <EsquemasItem 
                        key={esq._id}
                        esquema={esq}
                    /> )
            }
        </div>
    );
}

export { EsquemasLista as default };