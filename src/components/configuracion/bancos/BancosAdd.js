
import React, { useState } from 'react';
import BancosForm from './BancosForm';
import { history } from '../../../router/AppRouter';
import { AxiosExpenseApi } from '../../../utils/axiosApi';
import Loader from '../../Loader';


const BancosAdd = () => {

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            await axiosApi.post('/bancos', { ...data })
            setLoading(false);
            history.push('/bancos');

        }
        catch (e) {
            alert(e);
        }


    }

    return (
        <div>
            <h1>Nuevo Banco</h1>
            {loading && <Loader />}
            {!loading && <BancosForm onSubmit={onSubmit} />}
        </div>
    );
}

export { BancosAdd as default };