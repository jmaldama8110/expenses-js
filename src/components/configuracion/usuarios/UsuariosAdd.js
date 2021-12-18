
import React, { useState } from 'react';
import UsuariosForm from './UsuariosForm';
import { history} from '../../../router/AppRouter';

import Loader from '../../Loader';

import { AxiosExpenseApi } from '../../../utils/axiosApi';

const UsuariosAdd = () => {

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {

        try{

            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            let res = await axiosApi.post('/usuarios', {...data} );

            if( res.data.usuario.puesto ){
                const puesto_id = res.data.usuario.puesto[0];
                res = await axiosApi.patch(`/puestos/${puesto_id}`, { asignado: true } );

            }

            setLoading(false);
            history.push('/usuarios');
        }
        catch(e){
            alert(e);
        }
    


        

    }

    return (
        <div>
            <h1>Nuevo Usuario</h1>
            { loading && <Loader />}
            { !loading && <UsuariosForm onSubmit={onSubmit}/>}
        </div>
    );
}

export { UsuariosAdd as default };