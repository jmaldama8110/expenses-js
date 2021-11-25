import React, { useEffect, useState } from 'react';
import OrdenMisionForm from './OrdenMisionForm';
import { history} from '../../router/AppRouter';
import Header from '../Header';

import Loader from '../Loader';
import { AxiosExpenseApi } from '../../utils/axiosApi';

const OrdenMisionAdd = () => {
    
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {

        setLoading(true);
        const axiosApi = AxiosExpenseApi();
        axiosApi.post('/ordenes',{
            ...data
        }).then( res =>{
            history.push('/home');
        }).catch( e =>{
            alert(e);
        }).finally( () => {
            setLoading(false);
        })

    }

    return (
        <div>
            <Header />
            <h1>Nueva Orden de Mision</h1>
            { loading && <Loader />}
            { !loading && <OrdenMisionForm onSubmit={onSubmit}/>}
        </div>
    );
}

export { OrdenMisionAdd as default };