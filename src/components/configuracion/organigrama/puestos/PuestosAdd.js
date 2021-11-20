
import React, { useEffect, useState } from 'react';
import PuestosForm from './PuestosForm';
import { history } from "../../../../router/AppRouter";

import { AxiosExpenseApi } from '../../../../utils/axiosApi';
import Loader from '../../../Loader';


const PuestosAdd = () => {

    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        const axiosApi = AxiosExpenseApi();
        if( axiosApi ){
            axiosApi.post('/puestos',{...data})
            .then( (res)=>{
                history.push('/organigrama');
            }).catch( e=>{
                alert(e)
            }).finally( ()=>{
                setLoading(false);
            })
        }
    
    }

    return (
        <div>
            <h1>Nuevo Puesto</h1>
            { loading && <Loader />}
            { !loading && <PuestosForm onSubmit={onSubmit}/>}
        </div>
    );
}

export { PuestosAdd as default };