
import React, { useState } from 'react';
import EmpresasForm from './EmpresasForm';
import { history } from '../../../router/AppRouter';
import { AxiosExpenseApi } from '../../../utils/axiosApi';
import Loader from '../../Loader';


const EmpresasAdd = () => {

    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);

        const axiosApi = AxiosExpenseApi();
        if( axiosApi ){

            axiosApi.post('/empresas',{...data}
            ).then( (res)=>{
                history.push('/empresas');
            }).catch( (e)=>{
                alert(e);
            }).finally( ()=>{
                setLoading(false);
            })
        }
    
    
    }

    return (
        <div>
            <h1>Nueva Empresa</h1>
            { loading && <Loader />}
            { !loading && <EmpresasForm onSubmit={onSubmit}/>}
        </div>
    );
}

export { EmpresasAdd as default };