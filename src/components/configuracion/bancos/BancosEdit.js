import React, { useEffect, useState } from "react";
import { history } from "../../../router/AppRouter";
import BancosForm from './BancosForm';
import Loader from "../../Loader";

import { AxiosExpenseApi } from "../../../utils/axiosApi";

const BancosEdit = ({ match })=> {

    const [banco, setBanco] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect( () => {

        const loadData = async () => {
            try {
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                
                const res = await  axiosApi.get(`/bancos?id=${match.params.id}`)
                setBanco(res.data[0]);
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

            await axiosApi.patch(`/bancos/${match.params.id}`,{
                ...data}
            );
            setLoading(false);
            history.push('/bancos');
        }
        catch(e) {
            alert(e);
        }
        

    }

    return (
        <div>
            <h1>Editar Banco '{banco.numero_cuenta}'</h1>
            {
                loading && <Loader />
            }
            
            {
                !loading &&
                <BancosForm
                banco={banco}
                onSubmit={OnSubmit}
                />
            }
        </div>
    );
}

export { BancosEdit as default };