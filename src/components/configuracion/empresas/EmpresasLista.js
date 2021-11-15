import React,{useContext} from "react";
import EmpresasItem from "./EmpresasItem";

import ExpensesContext from '../../../context/ExpensesContext';

const EmpresasLista = () => {

    const { empresas } = useContext(ExpensesContext);

    return (
        <div>
            <div className="gridflex">
                <p className="headerlabel">id</p>
                <p className="headerlabel">nombre</p>


            </div>
            {
            empresas.map( empresa => 
                    <EmpresasItem 
                        key={empresa.id}
                        empresa={empresa}
                    /> )
            }
        </div>
    );
}

export { EmpresasLista as default };