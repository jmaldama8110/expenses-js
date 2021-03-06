import React, { useContext } from "react";
import ExpensesContext from "../../../context/ExpensesContext";
import AnticiposItem from './AnticiposItem';

const AnticiposLista = () => {

    const { anticipos } = useContext(ExpensesContext);

    return (
            <div>
                {
                    anticipos.map( (item,i) => <AnticiposItem key={i} 
                                                            item={item}
                                                            />)
                }
            </div>    );
}

export { AnticiposLista as default };