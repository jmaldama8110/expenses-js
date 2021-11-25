
import React, { useState } from 'react';
import UsuariosForm from './UsuariosForm';
import { history} from '../../../router/AppRouter';

import Loader from '../../Loader';

import { AxiosExpenseApi } from '../../../utils/axiosApi';

const UsuariosAdd = () => {

    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {

        setLoading(true);
        const axiosApi = AxiosExpenseApi();
        
        axiosApi.post('/usuarios',{
            ...data
        }).then( (res) =>{
            
            axiosApi.get('usuarios').then( res =>{
                console.log(res.data);
            }).catch(e =>{
                alert(e);
            });
            history.push('/usuarios');

        }).catch( e =>{
            alert(e);
        }).finally( ()=>{
            setLoading(false);
        })


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