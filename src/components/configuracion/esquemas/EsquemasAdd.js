
import React, { useState } from 'react';
import EsquemasForm from './EsquemasForm';
import { history} from '../../../router/AppRouter';

import Loader from '../../Loader';

import { AxiosExpenseApi, getUsuarioSession } from '../../../utils/axiosApi';


const EsquemasAdd = () => {

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            const usuario = getUsuarioSession();

            const res = await axiosApi.post("/esquemas",{
                empresa_id: usuario.info.preferences.empresa_default.id,
                ...data
            });
            setLoading(false);
            history.push("/esquemas");
        }
        catch(e) {
            console.log(e);
            alert(e);
        }
    }

    return (
        <div>
            <h1>Nuevo Esquema</h1>
            { loading && <Loader />}
            { !loading && <EsquemasForm onSubmit={onSubmit}/>}
        </div>
    );
}

export { EsquemasAdd as default };