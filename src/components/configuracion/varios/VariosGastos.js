import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

import VariosLista from './VariosLista';
import Loader from '../../Loader';

import ExpensesContext from '../../../context/ExpensesContext';
import VariosReducer from '../../../reducers/varios';

import { AxiosExpenseApi } from '../../../utils/axiosApi';


const VariosGastos = () => {

    const [varios, dispatchVarios] = useReducer(VariosReducer, []);

    const [descripcion, setDescripcion] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [subcuenta, setSubcuenta] = useState('');

    const [empresaId, setEmpresaId] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [empresas, setEmpresas] = useState([]);

    const [centrocostoId, setCentroCostoId] = useState('');
    const [centrocosto, setCentroCosto] = useState('');
    const [centroscosto, setCentrosCosto] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const loadData = async () => {

            try {
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                let res = await axiosApi.get('/varios');

                dispatchVarios({
                    type: "POPULATE_VARIOS",
                    varios: res.data
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
            catch (e) {
                console.log(e);
                alert(e);
            }
        }

        loadData();

    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const axiosApi = AxiosExpenseApi();


            let res = await axiosApi.post('/varios', {
                empresa: [empresaId, empresa],
                centrocosto: [centrocostoId, centrocosto],
                descripcion,
                cuenta,
                subcuenta
            })

            dispatchVarios({
                type: "ADD_VARIOS",
                _id: res.data._id,
                descripcion: res.data.descripcion,
                empresa: res.data.empresa,
                cuenta: res.data.cuenta,
                subcuenta: res.data.subcuenta
            });
            setLoading(false);
        }
        catch (e) {
            console.log(e);
            alert(e);
        }



    }

    useEffect(() => {

        const loadData = async ()=> {
            const idempresa = empresaId;
            const axiosApi = AxiosExpenseApi();
            let res = await axiosApi.get('/centrocosto/all');
            const tmp = res.data.filter( i => i.empresa[0] === idempresa );
            setCentrosCosto(tmp);
        }

        loadData();

    }, [empresaId])

    return (
        <div>
            <h1>Gastos Varios por Empresa</h1>

            <form onSubmit={onSubmit}>
                <p>Descripcion</p>
                <input type="text"
                    placeholder="Descipcion"
                    required
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                ></input>
                <p>Cuenta</p>
                <input type="text"
                    placeholder="Cuenta"
                    required
                    value={cuenta}
                    onChange={e => setCuenta(e.target.value)}
                ></input>
                <p>Subcuenta</p>
                <input type="text"
                    placeholder="Subcuenta"
                    required
                    value={subcuenta}
                    onChange={e => setSubcuenta(e.target.value)}
                ></input>
                <p>Empresa</p>
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

                <p>Centro de Costo</p>
                <select
                    value={centrocostoId}
                    required
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

                {!loading && <button>Guardar</button>}
            </form>


            <ExpensesContext.Provider value={{ varios, dispatchVarios }}>
                {loading && <Loader />}
                {!loading && <VariosLista />}
            </ExpensesContext.Provider>


            <Link to="/home">Regresar</Link>
        </div>
    );
}

export { VariosGastos as default };
