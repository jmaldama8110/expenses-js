import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import ExpensesContext from "../../context/ExpensesContext";
import { formatoPesos } from '../../utils/numberFormatter';

const OrdenMisionStats = () => {

    const { anticipos, comprobantes, varios_gastos, setEstatus, setEstatusId, estatusId } = useContext(ExpensesContext);

    const [tanticipos, setTotalAnticipos] = useState('0');

    const [tgasto, setTotalGasto] = useState('0');

    const [tkm, setTotalKm] = useState('0');
    const [ttransporte, setTotalTransporte] = useState('0');
    const [trecepcion, setTotalRecepcion] = useState('0');
    const [thospedaje, setTotalHospedaje] = useState('0');
    const [talimentos, setTotalAlimentos] = useState('0');
    const [tmttovehiculos, setTotalMttoVehiculos] = useState('0');
    const [tnodeducibles, setTotalNodeducibles] = useState('0');
    const [tvarios, setTotalVarios] = useState('0');

    const [saldo, setSaldo] = useState('0');
    const [saldoEstatus, setSaldoEstatus] = useState('')

    const totalAnticipos = () => {
        let tot = 0;
        anticipos.forEach(e => {

            let importe = 0;
            if (e.tipo_mov[0] === 'A') {
                importe = parseFloat(e.importe);
            }
            if (e.tipo_mov[0] === 'R' || e.tipo_mov[0] === 'X') {
                importe = parseFloat(e.importe) * (-1);
            }
            tot = tot + parseFloat(importe);
        })

        return tot;

    }



    const totalGastos = () => {

        let tot = 0,
            tot_transporte = 0,
            tot_alimentos = 0,
            tot_recepcion = 0,
            tot_hospedaje = 0,
            tot_mttoVehiculos = 0,
            tot_nodeducibles = 0,
            tot_varios = 0;

        comprobantes.forEach(e => {

            tot = tot - parseFloat(e.importe);
            switch (e.tipo_concepto[0]) {
                case 'A':
                    return tot_alimentos = tot_alimentos - parseFloat(e.importe);
                case 'T':
                    return tot_transporte = tot_transporte - parseFloat(e.importe);
                case 'H':
                    return tot_hospedaje = tot_hospedaje - parseFloat(e.importe);
                case 'R':
                    return tot_recepcion = tot_recepcion - parseFloat(e.importe);
                case 'M':
                    return tot_mttoVehiculos = tot_mttoVehiculos - parseFloat(e.importe);
                case 'N':
                    return tot_nodeducibles = tot_nodeducibles - parseFloat(e.importe);
            }
        });

        varios_gastos.forEach(e => {
            tot_varios = tot_varios - parseFloat(e.importe)
        });
        tot = tot + tot_varios;

        return {
            tot,
            tot_transporte,
            tot_alimentos,
            tot_recepcion,
            tot_hospedaje,
            tot_mttoVehiculos,
            tot_nodeducibles,
            tot_varios
        };

    }


    const totalKm = () => {
        setTotalKm('0');
    }
    const evaluarSaldo = (saldo) => {
        if (saldo == 0) {
            return '(ok)';
        }
        if (saldo > 0) {
            return 'a devolver'
        }
        if (saldo < 0) {
            return 'a favor de usuario'
        }
    }

    useEffect(() => {
        const sumaAnticipos = totalAnticipos();
        const sumaGastosObj = totalGastos();

        setTotalAnticipos(formatoPesos(sumaAnticipos));

        const saldoTotal = sumaGastosObj.tot + sumaAnticipos;
        setSaldoEstatus(evaluarSaldo(saldoTotal));
        setSaldo(formatoPesos(saldoTotal));


    }, [anticipos]);

    useEffect(() => {

        const sumaAnticipos = totalAnticipos();
        const sumaGastosObj = totalGastos();

        setTotalGasto(formatoPesos(sumaGastosObj.tot));
        setTotalAlimentos(formatoPesos(sumaGastosObj.tot_alimentos));
        setTotalTransporte(formatoPesos(sumaGastosObj.tot_transporte));
        setTotalHospedaje(formatoPesos(sumaGastosObj.tot_hospedaje));
        setTotalRecepcion(formatoPesos(sumaGastosObj.tot_recepcion));
        setTotalMttoVehiculos(formatoPesos(sumaGastosObj.tot_mttoVehiculos));
        setTotalNodeducibles(formatoPesos(sumaGastosObj.tot_nodeducibles));
        setTotalVarios(formatoPesos(sumaGastosObj.tot_varios));

        const saldoTotal = sumaGastosObj.tot + sumaAnticipos;
        setSaldoEstatus(evaluarSaldo(saldoTotal));
        setSaldo(formatoPesos(saldoTotal));

    }, [comprobantes]);

    useEffect(() => {
        const sumaAnticipos = totalAnticipos();
        const sumaGastosObj = totalGastos();

        setTotalVarios(formatoPesos(sumaGastosObj.tot_varios));

        const saldoTotal = sumaGastosObj.tot + sumaAnticipos;
        setSaldoEstatus(evaluarSaldo(saldoTotal));
        setSaldo(formatoPesos(saldoTotal));
    }, [varios_gastos])

    const onSolicitarRevision = (e) => {

        e.preventDefault();

        if (window.confirm(`¿Solicitar a revision, enviara un correo a:jmgomez@gmail.com`)) {
            alert(`Se ha enviado un correo a jm@gmail.com`);

            setEstatus('En Revision');
            setEstatusId('R');

        }
    }

    const onAprobarComprobacion = (e) => {
        e.preventDefault();
        if (window.confirm(`¿Aprobar la comprobacion?`)) {

            setEstatus('Finalizada');
            setEstatusId('F');
        }
    }

    return (
        <div>
            <h3>Saldo: <span>{saldo}</span> {saldoEstatus}</h3>
            {(saldoEstatus === '(ok)' && estatusId === 'A') &&

                <button onClick={onSolicitarRevision}
                >Solicitar revision</button>
            }
            {
                (saldoEstatus === '(ok)' && estatusId === 'R') &&
                <button onClick={onAprobarComprobacion}
                >Aprobar Comprobacion</button>
            }
            <ul>
                <li>Anticipos y Reembolsos: <strong>{tanticipos}</strong></li>
                <li>Gastos: <strong>{tgasto}</strong></li>
            </ul>
            <ul>
                <li>Kilometros: <strong>{tkm}</strong></li>
                <li>Transporte: <strong>{ttransporte}</strong></li>
                <li>Recepcion: <strong>{trecepcion}</strong></li>
                <li>Hospedaje: <strong>{thospedaje}</strong></li>
                <li>Alimentos: <strong>{talimentos}</strong></li>
                <li>Mantenimiento de Vehiculos: <strong>{tmttovehiculos}</strong></li>
                <li>No deducibles: <strong>{tnodeducibles}</strong></li>
                <li>Varios: <strong>{tvarios}</strong></li>
            </ul>
        </div>
    );
}

export { OrdenMisionStats as default }