
import React, { useEffect, useState } from "react";
import { AxiosExpenseApi } from "../../../utils/axiosApi";
import { history } from '../../../router/AppRouter';

const Costokm = () => {

    const [km, setKm] = useState('0')

    useEffect(() => {
        const loadData = async () => {
            try {
                const axiosApi = AxiosExpenseApi();
                let res = await axiosApi.get('/params/km');
                setKm(res.data[0].valor);

            }
            catch (e) {
                alert(e);
            }
        }

        loadData();
    }, []);

    const onGuardar = async (e) => {
        e.preventDefault();

        try {
            const axiosApi = AxiosExpenseApi();
            let res = await axiosApi.patch('/params/km', { valor: km });
            history.push('/home');
        }
        catch (e) {
            alert('Error al actualizar el dato KM...');
        }

    }

    return (
        <div>
            <h2>Cuota de pago por kilometraje</h2>
            <form>
                <label>Importe pagado por cada kilometro recorrido</label>
                <input
                    type="number"
                    placeholder="Cuota por km de consumo"
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                ></input>
                <button onClick={onGuardar}>Guardar</button>
            </form>
        </div>
    );
}

export { Costokm as default };