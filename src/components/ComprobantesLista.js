import React, {useContext} from 'react';
import Comprobante from './Comprobante';
import ComprobantesContext from '../context/comprobantesContext';

const ComprobantesLista = () => {

    const {comprobantes} = useContext(ComprobantesContext)
    return (
        comprobantes.map( item => (
            <Comprobante    key={item.folio} 
                            comprobante={item} /> ) )
    );
}

export { ComprobantesLista as default }
