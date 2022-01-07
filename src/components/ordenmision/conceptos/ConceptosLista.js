import React, { useContext } from "react";
import ExpensesContext from '../../../context/ExpensesContext';
import ConceptosItem from './ConceptosItem';

const ConceptosLista = () => {

    const { conceptos } = useContext(ExpensesContext);

    return (
            <ul>
                {
                    conceptos.map( (item,i) => <ConceptosItem key={i} 
                                                            item={item}
                                                            />)
                }
            </ul>    );
}

export { ConceptosLista as default };