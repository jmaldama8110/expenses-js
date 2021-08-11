import React, {useContext} from 'react';
import Comprobante from './Comprobante';
import ComprobantesContext from '../context/comprobantesContext';

const ComprobantesLista = () => {

    const {comprobantes} = useContext(ComprobantesContext)

    return (        
        comprobantes.map( comprobante => (
            <Comprobante    key={comprobante.folio} 
                            comprobante={comprobante} /> ) )
    );
}

export { ComprobantesLista as default }
