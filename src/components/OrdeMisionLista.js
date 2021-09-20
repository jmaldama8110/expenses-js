import React, { useContext } from 'react';
import OrdenMisionItem from './OrdenMisionItem';
import ComprobantesContext from '../context/comprobantesContext';

const OrdenMisionLista = () => {

    const { ordenes } = useContext(ComprobantesContext)

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