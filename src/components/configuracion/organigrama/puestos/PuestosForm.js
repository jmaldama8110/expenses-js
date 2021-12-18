import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AxiosExpenseApi } from '../../../../utils/axiosApi';
import Loader from '../../../Loader';

const PuestosForm = ({ onSubmit, puesto }) => {

    const [titulo, setTitulo] = useState('');

    const [deptoId, setDeptoId] = useState('');
    const [depto, setDepto] = useState('');

    const [parentId, setParentId] = useState('');
    const [parent, setParent] = useState('');

    const [esquemaId, setEsquemaId] = useState('');
    const [esquema, setEsquema] = useState('');

    const [centroCostoId, setCentroCostoId] = useState('');
    const [centroCosto, setCentroCosto] = useState('');

    const [isroot, setIsRoot] = useState(false);

    const [asignado, setAsignado] = useState(false);

    const [deptos, setDeptos] = useState([]);
    const [puestos, setPuestos] = useState([]);
    const [esquemas, setEsquemas] = useState([]);
    const [centroscosto, setCentrosCosto] = useState([]);
    const [empresas, setEmpresas] = useState([]);

    const [empresaId, setEmpresaId] = useState('');
    const [empresa, setEmpresa] =  useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {

            const axiosApi = AxiosExpenseApi();

            try {

                setLoading(true);
                let res = await axiosApi.get('/deptos');
                const lsDeptos = res.data;
                lsDeptos.unshift({
                    _id: "",
                    titulo: "Departamento"
                });
                setDeptos(lsDeptos);

                res = await axiosApi.get('/puestos');
                const lsPuestos = res.data;

                lsPuestos.unshift({
                    _id: "",
                    titulo: "Puesto"
                });
                setPuestos(lsPuestos);

                res = await axiosApi.get('/usuarios/yo');
                const empresasTmp = res.data.empresas;
                empresasTmp.unshift( ['','Elige empresa', true]);
                setEmpresas(empresasTmp.filter(i => i[2] === true));

                if (puesto) {

                    setTitulo(puesto.titulo);

                    setEmpresaId( puesto.empresa[0]);
                    setEmpresa( puesto.empresa[1]);

                    setDeptoId(puesto.depto[0]);
                    setDepto(puesto.depto[1]);

                    const data = JSON.stringify({
                        _id: puesto.empresa[0],
                        nombre: puesto.empresa[1]
                    });
                    await populateSelectList(data);


                    setParentId(puesto.parent[0]);
                    setParent(puesto.parent[1]);

                    setEsquemaId(puesto.esquema[0]);
                    setEsquema(puesto.esquema[1]);

                    setCentroCostoId(puesto.centrocosto[0]);
                    setCentroCosto(puesto.centrocosto[1]);

                    setIsRoot(puesto.isroot);
                    setAsignado(puesto.asignado);
                }
                setLoading(false);

            }
            catch (e) {
                alert(e);
            }

        }

        if (mounted) {
            loadData();
        }

        return () => mounted = false;
    }, [])

    const onGuardar = (e) => {
        e.preventDefault();

        const data = {
            titulo: titulo,
            depto: [deptoId, depto],
            esquema: [esquemaId, esquema],
            centrocosto: [centroCostoId, centroCosto],
            empresa: [empresaId, empresa],
            parent: [parentId, parent],
            isroot: isroot,
            asignado: asignado
        }
        onSubmit(data);

    }

    const populateSelectList = async (data) => {

        const axiosApi = AxiosExpenseApi();

        setLoading(true);

        let res = await axiosApi.get(`/centroscosto?empresa=${data}`);
        const ccTmp = res.data;
        ccTmp.unshift({
            _id: '',
            nombre: 'Centro de costo'
        })
        setCentrosCosto(res.data);

        res = await axiosApi.get(`/esquemas?empresa=${data}`)
        const esquemasTmp = res.data;
        esquemasTmp.unshift({
            _id: '',
            descripcion: 'Elige Esquema'
        });
        setEsquemas(res.data);

        setLoading(false);

    }

    return (
        <div>

            {loading && <Loader />}
            {!loading && <form onSubmit={onGuardar}>
                <p>Titulo del puesto</p>
                <input
                    type="text"
                    placeholder="Titulo del puesto"
                    value={titulo}
                    required
                    onChange={(e) => setTitulo(e.target.value)}
                ></input>

                <input
                    id="isroot"
                    type="checkbox"

                    checked={isroot}
                    onChange={e => setIsRoot(e.target.checked)}

                ></input>
                <label htmlFor="isroot">Usuario raiz</label>
                <br />

                <input
                    id="asignado"
                    type="checkbox"
                    disabled
                    checked={asignado}
                    onChange={e => setAsignado(e.target.checked)}

                ></input>
                <label htmlFor="asignado">Asignado a Usuario</label>
                <br />


                <p>Departamento</p>
                <select
                    required
                    value={deptoId}
                    onChange={(e) => {
                        setDeptoId(e.target.value);
                        setDepto(e.target.options[e.target.selectedIndex].text);

                    }}
                >
                    {
                        deptos.map(d => <option
                            key={d._id}
                            value={d._id}
                        >
                            {`${d.titulo}`}
                        </option>)
                    }

                </select>
                <p>Empresa</p>
                <select
                    value={empresaId}
                    required
                    onChange={async (e) => {
                        setEmpresaId(e.target.value);
                        setEmpresa(e.target.options[e.target.selectedIndex].text);

                        const data = JSON.stringify({
                            _id: e.target.value,
                            nombre: e.target.options[e.target.selectedIndex].text
                        });
                        await populateSelectList(data);

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
                <p>Esquema Contable</p>
                <select
                    required
                    value={esquemaId}
                    onChange={(e) => {
                        setEsquemaId(e.target.value);
                        setEsquema(e.target.options[e.target.selectedIndex].text);

                    }}
                >
                    {
                        esquemas.map(esq => <option
                            key={esq._id}
                            value={esq._id}
                        >
                            {`${esq.descripcion}`}
                        </option>)
                    }

                </select>
                <p>Centro de Costos</p>
                <select
                    required
                    value={centroCostoId}
                    onChange={(e) => {
                        setCentroCostoId(e.target.value);
                        setCentroCosto(e.target.options[e.target.selectedIndex].text);

                    }}
                >
                    {
                        centroscosto.map(cc => <option
                            key={cc._id}
                            value={cc._id}
                        >
                            {`${cc.nombre}`}
                        </option>)
                    }

                </select>

                {!isroot &&
                    <div>
                        <p>Jefe inmediato</p>
                        <select
                            required
                            value={parentId}
                            onChange={(e) => {
                                setParentId(e.target.value);
                                setParent(e.target.options[e.target.selectedIndex].text);
                            }}
                        >
                            {
                                puestos.map(p => <option
                                    key={p._id}
                                    value={p._id}
                                >
                                    {p.titulo}

                                </option>)
                            }


                        </select>
                    </div>}


                <button>Guardar</button>
                <Link to="/organigrama">Cancelar</Link>
            </form>}

        </div>
    );
}

export { PuestosForm as default };