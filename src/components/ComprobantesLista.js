import React, {useContext} from 'react';
import Comprobante from './Comprobante';
import ComprobantesAlimentosContext from '../context/comprobantesAlimentosContext';

const ComprobantesLista = () => {

    const {comprobantes} = useContext(ComprobantesAlimentosContext)
    return (
        comprobantes.map( item => (
            <Comprobante    key={item.folio} 
                            comprobante={item} /> ) )
    );
}

export { ComprobantesLista as default }
