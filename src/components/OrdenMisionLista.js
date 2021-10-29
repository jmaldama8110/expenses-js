import React, { useContext } from 'react';
import OrdenMisionItem from './OrdenMisionItem';
import ExpensesContext from '../context/ExpensesContext';

const OrdenMisionLista = () => {

    const { ordenes } = useContext(ExpensesContext)

    return (
        <div className="ordentable">        
            {
            ordenes.map( item => 
                    <OrdenMisionItem 
                    key={item.folio}
                    item={item}
                /> )
            }
        </div>
    );
}

export { OrdenMisionLista as default };