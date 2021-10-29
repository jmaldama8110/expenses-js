import React, { useEffect, useState } from 'react';

import OrdenMisionForm from './OrdenMisionForm';
import { history} from '../router/AppRouter';

const OrdenMisionEdit = ( { match } ) => {

    const [ordenes, setOrdenes] = useState([]);
    const [loading ,setLoading] = useState(true);
   
    useEffect( () => {

        // retrieves ordenes from localStorage
        const localData = JSON.parse(localStorage.getItem('ordenes'))
        if( localData ) {
            setOrdenes(localData);
            setLoading(false);
        }
        //////

    },[]);

    const OnSubmit = (data) => {

        const new_ordenes = ordenes.map( item => {
            if( item.folio === data.folio ){
                return {
                    ...item,
                    ...data
                }
    
            }    else {
                return item;
            }
        })

        localStorage.setItem('ordenes', JSON.stringify(new_ordenes));
        history.push('/home');
    }

    
    return (
        <div>
            <h1>Editar Orden de Mision</h1>
            {      !loading &&
                    <OrdenMisionForm
                    orden={ ordenes.find( item => item.folio === match.params.id ) }
                    onSubmit={OnSubmit}
            />}

        </div>
    );
}

export { OrdenMisionEdit as default };