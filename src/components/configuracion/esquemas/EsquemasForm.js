import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosExpenseApi } from "../../../utils/axiosApi";

const EsquemasForm = ({ onSubmit, esquema }) => {

    const [empresaId, setEmpresaId] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [empresas, setEmpresas] = useState([]);

    const [descripcion, setDescripcion] = useState('');

    const [aj_cuenta, setAJCuenta] = useState('');
    const [aj_subcuenta, setAJSubcuenta] = useState('');
    const [aj_tope, setAJTope] = useState('');
    const [aj_descripcion, setAJDescripcion] = useState('');

    const [cuentaId, setCuentaId] = useState('');
    const [anticipos_banco, setAnticiposBanco] = useState({})
    const [cuentas, setCuentas] = useState([]);

    const [trans_cuenta, setTransCuenta] = useState('');
    const [trans_subcuenta, setTransSubcuenta] = useState('');
    const [trans_tope, setTransTope] = useState('');
    const [trans_descripcion, setTransDescripcion] = useState('');

    const [recep_cuenta, setRecepCuenta] = useState('');
    const [recep_subcuenta, setRecepSubcuenta] = useState('');
    const [recep_tope, setRecepTope] = useState('');
    const [recep_descripcion, setRecepDescripcion] = useState('');

    const [hosp_cuenta, setHospCuenta] = useState('');
    const [hosp_subcuenta, setHospSubcuenta] = useState('');
    const [hosp_tope, setHospTope] = useState('');
    const [hosp_descripcion, setHospDescripcion] = useState('');

    const [alimen_cuenta, setAlimenCuenta] = useState('');
    const [alimen_subcuenta, setAlimenSubcuenta] = useState('');
    const [alimen_tope, setAlimenTope] = useState('');
    const [alimen_descripcion, setAlimenDescripcion] = useState('');

    const [mtto_cuenta, setMttoCuenta] = useState('');
    const [mtto_subcuenta, setMttoSubcuenta] = useState('');
    const [mtto_tope, setMttoTope] = useState('');
    const [mtto_descripcion, setMttoDescripcion] = useState('');

    const [noded_cuenta, setNodedCuenta] = useState('');
    const [noded_subcuenta, setNodedSubcuenta] = useState('');
    const [noded_tope, setNodedTope] = useState('');
    const [noded_descripcion, setNodedDescripcion] = useState('');

    const [iva_cuenta, setIvaCuenta] = useState('');
    const [iva_subcuenta, setIvaSubcuenta] = useState('');
    const [iva_descripcion, setIvaDescripcion] = useState('');


    useEffect(() => {

        const loadData = async () => {

            try {
                const axiosApi = AxiosExpenseApi();
                let res = await axiosApi.get('/empresas');
                const empresasTmp = res.data;
                empresasTmp.unshift({
                    _id: '',
                    nombre: 'Elije la empresa'
                });
                setEmpresas(empresasTmp);

                res = await axiosApi.get('/bancos');
                const bancosTmp = res.data;
                bancosTmp.unshift({
                    _id: '',
                    numero_cuenta: 'Elije cuenta bancaria',
                    banco: ['', '']
                })
                setCuentas(bancosTmp);

            }
            catch (e) {
                alert(e);
            }
        }

        loadData();

        if (esquema) {

            setDescripcion(esquema.descripcion);

            if (esquema.empresa) {
                setEmpresaId(esquema.empresa[0]);
                setEmpresa(esquema.empresa[1]);
            }

            if (esquema.anticipos_banco) {
                setCuentaId(esquema.anticipos_banco._id);
                const tmp = cuentas.find(i => i._id === esquema.anticipos_banco._id);
                setAnticiposBanco(tmp);
            }


            setAJCuenta(esquema.anticipos_cuenta);
            setAJSubcuenta(esquema.anticipos_subcuenta);
            setAJTope(esquema.anticipos_tope);
            setAJDescripcion(esquema.anticipos_desc);

            setTransCuenta(esquema.transporte_cuenta);
            setTransSubcuenta(esquema.transporte_subcuenta);
            setTransTope(esquema.transporte_tope);
            setTransDescripcion(esquema.transporte_desc);

            setRecepCuenta(esquema.recepcion_cuenta);
            setRecepSubcuenta(esquema.recepcion_subcuenta);
            setRecepTope(esquema.recepcion_tope);
            setRecepDescripcion(esquema.recepcion_desc);

            setHospCuenta(esquema.hospedaje_cuenta);
            setHospSubcuenta(esquema.hospedaje_subcuenta);
            setHospTope(esquema.hospedaje_tope);
            setHospDescripcion(esquema.hospedaje_desc);

            setAlimenCuenta(esquema.alimentos_cuenta);
            setAlimenSubcuenta(esquema.alimentos_subcuenta);
            setAlimenTope(esquema.alimentos_tope);
            setAlimenDescripcion(esquema.alimentos_desc);

            setMttoCuenta(esquema.mtto_vehiculos_cuenta);
            setMttoSubcuenta(esquema.mtto_vehiculos_subcuenta);
            setMttoTope(esquema.mtto_vehiculos_tope);
            setMttoDescripcion(esquema.mtto_vehiculos_desc);

            setNodedCuenta(esquema.nodeducibles_cuenta);
            setNodedSubcuenta(esquema.nodeducibles_subcuenta);
            setNodedTope(esquema.nodeducibles_tope);
            setNodedDescripcion(esquema.nodeducibles_desc);

            setIvaCuenta(esquema.iva_cuenta);
            setIvaSubcuenta(esquema.iva_subcuenta);
            setIvaDescripcion(esquema.iva_desc);

        }

    }, [])

    const onGuardar = (e) => {
        e.preventDefault();

        const data = {

            empresa: [empresaId, empresa],
            anticipos_banco,
            descripcion,
            anticipos_cuenta: aj_cuenta,
            anticipos_subcuenta: aj_subcuenta,
            anticipos_tope: aj_tope,
            anticipos_desc: aj_descripcion,

            transporte_cuenta: trans_cuenta,
            transporte_subcuenta: trans_subcuenta,
            transporte_tope: trans_tope,
            transporte_desc: trans_descripcion,

            recepcion_cuenta: recep_cuenta,
            recepcion_subcuenta: recep_subcuenta,
            recepcion_tope: recep_tope,
            recepcion_desc: recep_descripcion,

            hospedaje_cuenta: hosp_cuenta,
            hospedaje_subcuenta: hosp_subcuenta,
            hospedaje_tope: hosp_tope,
            hospedaje_desc: hosp_descripcion,

            alimentos_cuenta: alimen_cuenta,
            alimentos_subcuenta: alimen_subcuenta,
            alimentos_tope: alimen_tope,
            alimentos_desc: alimen_descripcion,

            nodeducibles_cuenta: noded_cuenta,
            nodeducibles_subcuenta: noded_subcuenta,
            nodeducibles_tope: noded_tope,
            nodeducibles_desc: noded_descripcion,

            mtto_vehiculos_cuenta: mtto_cuenta,
            mtto_vehiculos_subcuenta: mtto_subcuenta,
            mtto_vehiculos_tope: mtto_tope,
            mtto_vehiculos_desc: mtto_descripcion,

            iva_cuenta: iva_cuenta,
            iva_subcuenta: iva_subcuenta,
            iva_desc: iva_descripcion

        }
        onSubmit(data);
    }

    return (
        <form onSubmit={onGuardar}>
            <div>
                <div>
                    <h3>Empresa</h3>
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
                    <h3>Cuenta Bancaria Anticipos</h3>
                    <select
                        value={cuentaId}
                        required
                        onChange={e => {
                            setCuentaId(e.target.value);
                            const tmp = cuentas.find(i => i._id === e.target.value);
                            setAnticiposBanco(tmp);
                        }}
                    >
                        {
                            cuentas.map(cta => <option
                                key={cta._id}
                                value={cta._id}
                            >{cta.numero_cuenta} | {cta.banco[1]}({cta.banco[0]})
                            </option>)
                        }
                    </select>

                    <h3>Descripcion del Esquema</h3>

                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder='Descripcion del Esquema'
                    ></input>

                    <h3>Anticipos a justificar</h3>
                    <div>
                        <label>Cuenta&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label>Subcuenta&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label>Importe dirario&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label>Nombre de la cuenta</label>
                    </div>

                    <input
                        type="text"
                        value={aj_cuenta}
                        onChange={(e) => setAJCuenta(e.target.value)}
                        placeholder='Cuenta Contable'
                    ></input>
                    <input
                        type="text"
                        value={aj_subcuenta}
                        onChange={(e) => setAJSubcuenta(e.target.value)}
                        placeholder='Subcuenta Contable'
                    ></input>
                    <input
                        type="text"
                        value={aj_tope}
                        onChange={(e) => setAJTope(e.target.value)}
                        placeholder='Tope por dia'
                    ></input>
                    <input
                        type="text"
                        value={aj_descripcion}
                        onChange={(e) => setAJDescripcion(e.target.value)}
                        placeholder='Descripcion de la cuenta'
                    ></input>
                </div>
                <div>
                    <h3>Transporte</h3>
                    <input
                        type="text"
                        value={trans_cuenta}
                        onChange={(e) => setTransCuenta(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={trans_subcuenta}
                        onChange={(e) => setTransSubcuenta(e.target.value)}
                        placeholder='Cuenta de abono'
                    ></input>
                    <input
                        type="text"
                        value={trans_tope}
                        onChange={(e) => setTransTope(e.target.value)}
                        placeholder='Tope por dia'
                    ></input>
                    <input
                        type="text"
                        value={trans_descripcion}
                        onChange={(e) => setTransDescripcion(e.target.value)}
                        placeholder='Descripcion de la cuenta'
                    ></input>
                </div>
                <div>
                    <h3>Recepcion</h3>
                    <input
                        type="text"
                        value={recep_cuenta}
                        onChange={(e) => setRecepCuenta(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={recep_subcuenta}
                        onChange={(e) => setRecepSubcuenta(e.target.value)}
                        placeholder='Cuenta de abono'
                    ></input>
                    <input
                        type="text"
                        value={recep_tope}
                        onChange={(e) => setRecepTope(e.target.value)}
                        placeholder='Tope por dia'
                    ></input>
                    <input
                        type="text"
                        value={recep_descripcion}
                        onChange={(e) => setRecepDescripcion(e.target.value)}
                        placeholder='Descripcion de la cuenta'
                    ></input>
                </div>
                <div>
                    <h3>Hospedaje</h3>
                    <input
                        type="text"
                        value={hosp_cuenta}
                        onChange={(e) => setHospCuenta(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={hosp_subcuenta}
                        onChange={(e) => setHospSubcuenta(e.target.value)}
                        placeholder='Cuenta de abono'
                    ></input>
                    <input
                        type="text"
                        value={hosp_tope}
                        onChange={(e) => setHospTope(e.target.value)}
                        placeholder='Tope por dia'
                    ></input>
                    <input
                        type="text"
                        value={hosp_descripcion}
                        onChange={(e) => setHospDescripcion(e.target.value)}
                        placeholder='Descripcion de la cuenta'
                    ></input>
                </div>
                <div>
                    <h3>Alimentos</h3>
                    <input
                        type="text"
                        value={alimen_cuenta}
                        onChange={(e) => setAlimenCuenta(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={alimen_subcuenta}
                        onChange={(e) => setAlimenSubcuenta(e.target.value)}
                        placeholder='Cuenta de abono'
                    ></input>
                    <input
                        type="text"
                        value={alimen_tope}
                        onChange={(e) => setAlimenTope(e.target.value)}
                        placeholder='Tope por dia'
                    ></input>
                    <input
                        type="text"
                        value={alimen_descripcion}
                        onChange={(e) => setAlimenDescripcion(e.target.value)}
                        placeholder='Descripcion de la cuenta'
                    ></input>
                    <div>
                        <h3>Mantenimiento de Vehiculos</h3>
                        <input
                            type="text"
                            value={mtto_cuenta}
                            onChange={(e) => setMttoCuenta(e.target.value)}
                            placeholder='Cuenta de cargo'
                        ></input>
                        <input
                            type="text"
                            value={mtto_subcuenta}
                            onChange={(e) => setMttoSubcuenta(e.target.value)}
                            placeholder='Cuenta de abono'
                        ></input>
                        <input
                            type="text"
                            value={mtto_tope}
                            onChange={(e) => setMttoTope(e.target.value)}
                            placeholder='Tope por dia'
                        ></input>
                        <input
                            type="text"
                            value={mtto_descripcion}
                            onChange={(e) => setMttoDescripcion(e.target.value)}
                            placeholder='Descripcion de la cuenta'
                        ></input>
                    </div>
                    <div>
                        <h3>No deducibles</h3>
                        <input
                            type="text"
                            value={noded_cuenta}
                            onChange={(e) => setNodedCuenta(e.target.value)}
                            placeholder='Cuenta de cargo'
                        ></input>
                        <input
                            type="text"
                            value={noded_subcuenta}
                            onChange={(e) => setNodedSubcuenta(e.target.value)}
                            placeholder='Cuenta de abono'
                        ></input>
                        <input
                            type="text"
                            value={noded_tope}
                            onChange={(e) => setNodedTope(e.target.value)}
                            placeholder='Tope por dia'
                        ></input>
                        <input
                            type="text"
                            value={noded_descripcion}
                            onChange={(e) => setNodedDescripcion(e.target.value)}
                            placeholder='Descripcion de la cuenta'
                        ></input>
                    </div>
                    <div>
                        <h3>IVA</h3>
                        <input
                            type="text"
                            value={iva_cuenta}
                            onChange={(e) => setIvaCuenta(e.target.value)}
                            placeholder='Cuenta de cargo'
                        ></input>
                        <input
                            type="text"
                            value={iva_subcuenta}
                            onChange={(e) => setIvaSubcuenta(e.target.value)}
                            placeholder='Cuenta de abono'
                        ></input>
                        <input
                            type="text"
                            value={iva_descripcion}
                            onChange={(e) => setIvaDescripcion(e.target.value)}
                            placeholder='Descripcion de la cuenta'
                        ></input>
                    </div>
                </div>
            </div>
            <button>Enviar</button>
            <Link to="/esquemas">Cancelar</Link>
        </form>
    );
}

export { EsquemasForm as default };