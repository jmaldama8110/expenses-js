import React, { useEffect, useState } from "react";
import { history } from "../../../router/AppRouter";
import EsquemasForm from './EsquemasForm';
import Loader from "../../Loader";

import { AxiosExpenseApi } from "../../../utils/axiosApi";

const EsquemasEdit = ({ match })=> {

    const [esquema, setEsquema] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect( () => {

        const loadData = async () => {
            try {
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                
                const res = await  axiosApi.get(`/esquemas?id=${match.params.id}`)
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

            const res = await axiosApi.patch(`/esquemas/${match.params.id}`,{
                ...data}
            );
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