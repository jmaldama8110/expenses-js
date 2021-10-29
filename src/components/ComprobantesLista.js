import React, {useContext} from 'react';
import Comprobante from './Comprobante';
import ExpensesContext from '../context/ExpensesContext';

const ComprobantesLista = () => {

    const {comprobantes} = useContext(ExpensesContext);
    return (
        comprobantes.map( item => (
            <Comprobante    key={item.folio} 
                            comprobante={item} /> ) )
    );
}

export { ComprobantesLista as default }
