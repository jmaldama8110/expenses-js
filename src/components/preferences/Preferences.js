import React, { useEffect, useState } from "react";
import { AxiosExpenseApi, getUsuarioSession, setUsuarioSession } from "../../utils/axiosApi";

import { history } from "../../router/AppRouter";
import  {Link} from 'react-router-dom';
import Loader from "../Loader";

const Preferences = () => {

    const [loading, setLoading] = useState(false);
    
    const [empresaId, setEmpresaId] = useState('');
    const [empresa, setEmpresa] = useState('');

    const [centroCostoId, setCentroCostoId] = useState('');
    const [centroCosto, setCentroCosto] = useState('');

    const [esquemaId, setEsquemaId] = useState('');
    const [esquema, setEsquema] = useState('');

    const [puede_cambiar_esquema, setPuedeCambiarEsquema] = useState(false);

    const [empresas, setEmpresas] = useState([]);
    const [centroscosto, setCentrosCosto] = useState([]);
    const [esquemas, setEsquemas] = useState([]);

    useEffect(() => {

        const loadData = async () => {

            try {
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                const uss = getUsuarioSession().info;
                const empresasLista = uss.empresas.filter( emp => emp[2] );
                
                // Si NO tiene empresas asignadas
                let errors = [];
                
                if( !empresasLista.length ) {
                    errors = ['No tiene Empresas permitidas!',...errors]
                }
                if( !uss.puesto ){
                    errors = ['No tiene perfil de Puesto asignado!',...errors]
                }
                if( errors.length ){
                    throw errors;
                }

                setEmpresas(empresasLista);
                // sabiendo que tenemos al menos una empresa en la lista, establecemos el valor default
                const empresaDefault =  uss.preferences ? 
                                        uss.preferences.empresa_default : { id: empresasLista[0][0],nombre: empresasLista[0][1] };

                setEmpresaId(empresaDefault.id);
                setEmpresa( empresaDefault.nombre);


                let res = await axiosApi.get('/centroscosto');
                const ccTmp = res.data
                setCentrosCosto(ccTmp);

                res = await axiosApi.get(`/puestos?id=${uss.puesto[0]}`);
                const puestoData = res.data[0];
                
                const centrocostoDefault =  uss.preferences ?
                                            uss.preferences.centrocosto_default : { id: puestoData.centrocosto[0], nombre: puestoData.centrocosto[1]};

                setCentroCostoId( centrocostoDefault.id);
                setCentroCosto( centrocostoDefault.nombre);

                res = await axiosApi.get(`/esquemas/${empresaDefault.id}`);
                const esqTmp = res.data;
                setEsquemas( esqTmp );

                const esquemaDefault = uss.preferences ?
                                        uss.preferences.esquema_default : {id: puestoData.esquema[0], descripcion: puestoData.esquema[1]};

                setEsquemaId( esquemaDefault.id );
                setEsquema( esquemaDefault.descripcion);

                setPuedeCambiarEsquema( uss.puede_cambiar_esquema);

                setLoading(false);

            }
            catch (e) {
                alert(e);
            }


        }
        loadData();

    }, []);

    const onGuardar = async (e) => {
        e.preventDefault();

        const axiosApi = AxiosExpenseApi();
        try {

            const data = {
                preferences: {
                    empresa_default: {
                        id: empresaId,
                        nombre: empresa
                    },
                    centrocosto_default: {
                        id: centroCostoId,
                        nombre: centroCosto
                    },
                    esquema_default: {
                        id: esquemaId,
                        descripcion: esquema
                    }
                }
            }
            console.log(data);
            const res = await axiosApi.patch("/usuarios/yo", {
                    ...data
            });

            const lsUsu = getUsuarioSession(); // keeps the old token to renew the new usuario info
            setUsuarioSession( res.data,lsUsu.token );

            alert('Se han actualizado las preferencias de usuario!');
            history.push("/");

        } catch (e) {
            console.log(e);
            alert(e);
        }
    }


    return (
    <div>
       <h1>Mis preferencias</h1>
       {    loading && <Loader /> }
       {  loading && <Link to='/'>Volver al inicio</Link> }
       { !loading &&
        <form onSubmit={onGuardar}>

            <div>
                <h3>Empresa del entorno actual</h3>

                <select
                    value={empresaId}
                    onChange={e => {
                        setEmpresaId(e.target.value);
                        setEmpresa(e.target.options[e.target.selectedIndex].text);
                    }}
                >
                    {
                        empresas.map(emp => <option
                            key={emp[0]}
                            value={emp[0]}
                        >{emp[1]}
                        </option>)
                    }
                </select>
                <h3>Centro de Costo predeterminado</h3>

                <select
                    value={centroCostoId}
                    onChange={e => {
                        setCentroCostoId(e.target.value);
                        setCentroCosto(e.target.options[e.target.selectedIndex].text);
                    }}
                >
                    {
                        centroscosto.map(cc => <option
                            key={cc._id}
                            value={cc._id}
                        >{cc.nombre}
                        </option>)
                    }
                </select>

                <h3>Esquema predeterminado</h3>
                <select
                    value={esquemaId}
                    disabled={!puede_cambiar_esquema}
                    onChange={e => {
                        setEsquemaId(e.target.value);
                        setEsquema(e.target.options[e.target.selectedIndex].text);
                    }}
                >
                    {
                        esquemas.map(esq => <option
                            key={esq._id}
                            value={esq._id}
                        >{esq.descripcion}
                        </option>)
                    }
                </select>
            </div>
            <button>Aplicar</button>
        </form>}
    </div>
    );
}

export { Preferences as default };