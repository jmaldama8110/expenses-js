import React,{useContext} from "react";
import DeptosItem from "./DeptosItem";

import ExpensesContext from "../../../../context/ExpensesContext";

const DeptosLista = () => {

    const { deptos } = useContext(ExpensesContext);

    return (
        <div>
            <div className="gridflex">
                <p className="headerlabel">id</p>
                <p className="headerlabel">titulo</p>


            </div>
            {
            deptos.map( depto => 
                    <DeptosItem 
                        key={depto._id}
                        depto={depto}
                    /> )
            }
        </div>
    );
}

export { DeptosLista as default };