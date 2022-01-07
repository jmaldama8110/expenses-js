import React, { useContext } from "react";
import ExpensesContext from '../../../context/ExpensesContext';
import ComprobantesItem from './ComprobantesItem';

const ComprobantesLista = () => {

    const { comprobantes } = useContext(ExpensesContext);

    return (
            <ul>
                {
                    comprobantes.map( (item,i) => <ComprobantesItem key={i} 
                                                            item={item}
                                                            />)
                }
            </ul>    );
}

export { ComprobantesLista as default };