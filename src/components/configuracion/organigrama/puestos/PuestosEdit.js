
import React, { useEffect, useState } from "react";
import { history } from "../../../../router/AppRouter";
import { AxiosExpenseApi } from "../../../../utils/axiosApi";
import PuestosForm from './PuestosForm';

const PuestosEdit = ({ match })=> {

    const [puesto, setPuesto] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect( ()=>{
        
        const loadData = async () =>{

            try {
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                const res = await axiosApi.get(`/puestos?id=${match.params.id}`);
                setPuesto(res.data[0]);
                setLoading(false);    
            }
            catch(e){
                alert(e);
            }
        }
        loadData();

    },[]);

    const OnSubmit = async (data) => {

        try{
            setLoading(true);

            const axiosApi = AxiosExpenseApi();
            await axiosApi.patch(`/puestos/${match.params.id}`,{
                ...data
            });
            setLoading(false);
            history.push('/organigrama');
        }
        catch(e){
            alert(e);
        }
        

    }

    return (
        <div>
            <h1>Editar Puesto</h1>
            
            {
                !loading &&
                <PuestosForm
                puesto={puesto}
                onSubmit={OnSubmit}
            />}
        </div>
    );
}

export { PuestosEdit as default };