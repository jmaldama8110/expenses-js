import React, { useContext } from "react";
import ExpensesContext from '../../../context/ExpensesContext';
import VariosGastosItem from './VariosGastosItem';

const VariosGastosLista = () => {

    const { varios_gastos } = useContext(ExpensesContext);

    return (
            <ul>
                {
                    varios_gastos.map( (item,i) => <VariosGastosItem key={i} 
                                                            item={item}
                                                            />)
                }
            </ul>    );
}

export { VariosGastosLista as default };