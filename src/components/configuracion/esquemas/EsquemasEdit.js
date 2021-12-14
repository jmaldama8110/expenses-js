import React, { useEffect, useState } from "react";
import { history } from "../../../router/AppRouter";
import EsquemasForm from './EsquemasForm';
import Loader from "../../Loader";

import { AxiosExpenseApi, getUsuarioSession } from "../../../utils/axiosApi";

const EsquemasEdit = ({ match })=> {

    const [esquema, setEsquema] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect( () => {

        const loadData = async () => {
            try {
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                const usuario = getUsuarioSession();
                const res = await  axiosApi
                                    .get(`/esquemas/${usuario.info.preferences.empresa_default.id}/?id=${match.params.id}`)
            
                setEsquema(res.data[0]);
                setLoading(false);
            }
            catch(e){
                alert(e);
            }    
        }

        loadData();


    },[]);

    const OnSubmit = async (data) => {

        try {
            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            const usuario = getUsuarioSession();
            const empresa_id = usuario.info.preferences.empresa_default.id;
            const res = await axiosApi.patch(`/esquemas/${match.params.id}`,{empresa_id,...data} );
            setLoading(false);
            history.push('/esquemas');
        }
        catch(e) {
            alert(e);
        }
        

    }

    return (
        <div>
            <h1>Editar Esquema '{esquema.descripcion}'</h1>
            {
                loading && <Loader />
            }
            
            {
                !loading &&
                <EsquemasForm
                esquema={esquema}
                onSubmit={OnSubmit}
                />
            }
        </div>
    );
}

export { EsquemasEdit as default };