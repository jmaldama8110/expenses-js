import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import AutorizacionesItem from './AutorizacionesItem';

const AutorizacionesLista = () => {

    const { autorizaciones } = useContext(ExpensesContext);

    return (
            <div>
                {
                    autorizaciones.map( (item,i) => <AutorizacionesItem key={i} 
                                                            item={item}
                                                            />)
                }
            </div>    );
}

export { AutorizacionesLista as default };