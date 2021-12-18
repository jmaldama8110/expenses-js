import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

import CentroCostoLista from './CentroCostoLista';
import Loader from '../../Loader';

import ExpensesContext from '../../../context/ExpensesContext';
import CentroCostoReducer from '../../../reducers/centrocosto';

import { AxiosExpenseApi,getUsuarioSession } from '../../../utils/axiosApi';


const CentroCosto = () => {

    const [centroscosto, dispatchCentroCosto] = useReducer(CentroCostoReducer, []);

    const [nombre_centro_costo,setNombreCentroCosto] = useState('');
    const [codigo, setCodigo] = useState('');

    const [empresaId, setEmpresaId] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [empresas,setEmpresas] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect( ()=>{
        

        const loadData = async() => {

            try{
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                let res = await axiosApi.get('/centrocosto/all');
                
                dispatchCentroCosto( {
                    type: "POPULATE_CC",
                    centroscosto: res.data
                });

                res = await axiosApi.get('/empresas');
                const empresasTmp = res.data;
                empresasTmp.unshift({
                    _id: '',
                    nombre: ''
                })
                setEmpresas(empresasTmp);

                
                setLoading(false);
            }
            catch(e){
                console.log(e);
                alert(e);
            }
        }

        loadData();
        


    },[]);


    const onSubmit = async (e)=>{
        
        e.preventDefault();

        try{
            setLoading(true);
            const axiosApi = AxiosExpenseApi();
            let res = await axiosApi.post('/centroscosto',{ empresa: [empresaId,empresa],
                                                            nombre: nombre_centro_costo,
                                                            codigo,
                                                            activo: true,
                                                        })

            dispatchCentroCosto({
                    type: "ADD_CC",
                    _id: res.data._id,
                    empresa: res.data.empresa,
                    nombre: res.data.nombre,
                    codigo: res.data.codigo,
                    activo: true
                    
            });
            setLoading(false);
        }
        catch(e) {
            console.log(e);
            alert(e);
        }



    
    }

    return (
        <div>
            <h1>Centros de Costos</h1>


            <form onSubmit={onSubmit}>
                <input  type="text"
                        placeholder="nombre centro costo"
                        required
                        value={nombre_centro_costo}
                        onChange={ e => setNombreCentroCosto(e.target.value) }
                ></input>
                <input  type="text"
                        placeholder="codigo"
                        required
                        value={codigo}
                        onChange={ e => setCodigo(e.target.value) }
                ></input>
                <select
                    value={empresaId}
                    required
                    onChange={e => {
                        setEmpresaId(e.target.value);
                        setEmpresa(e.target.options[e.target.selectedIndex].text);
                    }}
                >
                    {
                        empresas.map(emp => <option
                            key={emp._id}
                            value={emp._id}
                        >{emp.nombre}
                        </option>)
                    }
                </select>

                
                { !loading && <button>Guardar</button>}
            </form>


        <ExpensesContext.Provider value={{ centroscosto,dispatchCentroCosto }}>
                { loading && <Loader />}
                { !loading && <CentroCostoLista />}
        </ExpensesContext.Provider>

            
            <Link to="/home">Regresar</Link>
        </div>
    );
}

export { CentroCosto as default };
