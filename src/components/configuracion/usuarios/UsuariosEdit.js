import React, { useEffect, useState } from "react";
import { history } from "../../../router/AppRouter";
import UsuariosForm from './UsuariosForm';
import Loader from "../../Loader";
import { AxiosExpenseApi } from "../../../utils/axiosApi";

const UsuariosEdit = ({ match })=> {

    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{


        const loadData = async () => {
            try {
                setLoading(true);
                const axiosApi = AxiosExpenseApi();

                let res = await axiosApi.get(`/usuarios/${match.params.id}`);
                
                setUsuario(res.data);
                setLoading(false);
            }
            catch(e)
            {
                alert(e);
            }

        }
        
        loadData();

    },[]);

    const OnSubmit = async (data) => {
        
        try{
            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            let res = await axiosApi.patch(`/usuarios/${match.params.id}`,{ ...data});

            /// si se cambia el puesto del usuario, entonces se deshabilita la bandera 'asignado' en el puesto anterior asi
            // estar disponible para otra asignacion
            if( usuario.puesto[0] !== res.data.puesto[0] ){
                await axiosApi.patch(`/puestos/${usuario.puesto[0]}`,{ asignado: false} );
            }
            
            if( res.data.puesto ){
                const puesto_id = res.data.puesto[0];
                res = await axiosApi.patch(`/puestos/${puesto_id}`, { asignado: true } );
            }
            setLoading(false);    
            history.push('/usuarios');

        }
        catch(e){
            console.log(e);
            alert(e);
        }



    }

    return (
        <div>
            <h1>Editar Usuario</h1>
            {
                loading && <Loader />
            }
            
            {
                !loading &&
                <UsuariosForm
                usuario={usuario}
                onSubmit={OnSubmit}
                />
            }
        </div>
    );
}

export { UsuariosEdit as default };