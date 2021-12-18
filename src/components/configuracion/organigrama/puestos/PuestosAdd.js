
import React, { useEffect, useState } from 'react';
import PuestosForm from './PuestosForm';
import { history } from "../../../../router/AppRouter";

import { AxiosExpenseApi } from '../../../../utils/axiosApi';
import Loader from '../../../Loader';


const PuestosAdd = () => {

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {

        try{

            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            let res = await axiosApi.post('/puestos',{...data});
            setLoading(false);
            history.push('/organigrama');

        }

        catch(e){
            alert(e);
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