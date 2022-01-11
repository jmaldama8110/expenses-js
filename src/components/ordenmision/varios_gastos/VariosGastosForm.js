import React, { useContext, useEffect, useState } from "react";
import { AxiosExpenseApi } from "../../../utils/axiosApi";
import ExpensesContext from '../../../context/ExpensesContext';

const VariosGastosForm = ({ vario_gasto, onSubmit }) => {

    const [variosObj, setVariosObj] = useState({});
    const [variosId, setVariosId] = useState('');
    const [varios, setVarios] = useState([]);

    const { varios_gastos } = useContext( ExpensesContext)

    const [concepto, setConcepto] = useState('');
    const [importe, setImporte] = useState('');
    const [subtotal, setSubtotal] = useState('');
    const [iva, setIva] = useState('');
    const [fecha_comprobante, setFechaComprobante] = useState('');

    useEffect(() => {

        let mounted = true;

        const loadData = async () => {
            const axiosApi = AxiosExpenseApi();
            let res = await axiosApi.get('/varios');
            setVarios(res.data);
        }

        loadData();

        if (mounted) {
            if (vario_gasto) {

                const tmp = varios_gastos.find( i => i._id === vario_gasto._id);
                setVariosObj(tmp);

                setVariosId( vario_gasto.varios_id);
                setConcepto(vario_gasto.concepto);
                setImporte(vario_gasto.importe);
                setSubtotal( vario_gasto.subtotal);
                setIva(vario_gasto.iva);
                setFechaComprobante(vario_gasto.fecha_comprobante);
            }
        }

        return () => mounted = false;

    }, [])

    const onGuardar = (e) => {

        e.preventDefault();

        const data = {
            varios_id: variosObj._id,
            descripcion: variosObj.descripcion,
            cuenta: variosObj.cuenta,
            subcuenta: variosObj.subcuenta,
            centrocosto: variosObj.centrocosto,
            concepto,
            importe,
            subtotal,
            iva,
            fecha_comprobante
        }
        onSubmit(data);

    }

    return (
        <div>
            <label>Tipo Gasto</label>
            <select value={variosId}
                onChange={(e) => {
                    setVariosId(e.target.value);
                    const tmp = varios.find(i => i._id === e.target.value)
                    setVariosObj(tmp);

                }}>
                {
                    varios.map(i =>
                        <option
                            key={i._id}
                            value={i._id}
                        >{i.descripcion}</option>
                    )
                }
            </select>

            <label>Concepto</label>
            <input
                type="text"
                value={concepto}
                onChange={(e) => { setConcepto(e.target.value) }}
            ></input>

            <label>Fecha Comprobante</label>
            <input
                type="date"
                value={fecha_comprobante}
                onChange={(e) => setFechaComprobante(e.target.value)}
            ></input>

            <label>Importe</label>
            <input
                type="text"
                value={importe}
                onChange={(e) => setImporte(e.target.value)}
            ></input>
            <label>Subtotal</label>
            <input
                type="text"
                value={subtotal}
                onChange={(e) => setSubtotal(e.target.value)}
            ></input>
            <label>IVA</label>
            <input
                type="text"
                value={iva}
                onChange={(e) => setIva(e.target.value)}
            ></input>


            <button onClick={onGuardar}>Ok</button>

        </div>
    );
}

export { VariosGastosForm as default };