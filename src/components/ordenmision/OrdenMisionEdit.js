import React, { useEffect, useState } from 'react';

import OrdenMisionForm from './OrdenMisionForm';
import { history} from '../../router/AppRouter';

import { AxiosExpenseApi } from '../../utils/axiosApi';


const OrdenMisionEdit = ( { match } ) => {

    const [orden, setOrden] = useState({});
    const [ loading, setLoading ] = useState(false);

    useEffect( ()=>{

        let mounted = true;

        const fetchData = async () => {
            try{
                if ( mounted) {
                    setLoading(true);
                    const axiosApi = AxiosExpenseApi();
                    const res = await axiosApi.get(`/ordenes/${match.params.id}`);
                    
                    setOrden(res.data);
                    setLoading(false);
                    
                }
            }
            catch (e){
                alert(e);
            }
        
        }
        fetchData();

        return ()=> mounted = false;

    },[]);
   

    const OnSubmit = (data) => {
        history.push('/home');
    }

    return (
        <div>
            <h1>Editar Orden de Mision</h1>
                    {! loading && <OrdenMisionForm
                        orden={orden}
                        onSubmit={OnSubmit} />}

        </div>
    );
}

export { OrdenMisionEdit as default };