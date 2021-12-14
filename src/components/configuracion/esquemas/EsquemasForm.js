import React, {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
const EsquemasForm = ({ onSubmit, esquema }) => {

    const [descripcion, setDescripcion] = useState('');

    const [aj_cargo, setAJCargo] = useState('');
    const [aj_abono, setAJAbono] = useState('');
    const [aj_tope, setAJTope] = useState('');
    const [aj_descripcion, setAJDescripcion] = useState('');

    const [trans_cargo, setTransCargo] = useState('');
    const [trans_abono, setTransAbono] = useState('');
    const [trans_tope, setTransTope] = useState('');
    const [trans_descripcion, setTransDescripcion] = useState('');

    const [recep_cargo, setRecepCargo] = useState('');
    const [recep_abono, setRecepAbono] = useState('');
    const [recep_tope, setRecepTope] = useState('');
    const [recep_descripcion, setRecepDescripcion] = useState('');

    const [hosp_cargo, setHospCargo] = useState('');
    const [hosp_abono, setHospAbono] = useState('');
    const [hosp_tope, setHospTope] = useState('');
    const [hosp_descripcion, setHospDescripcion] = useState('');

    const [alimen_cargo, setAlimenCargo] = useState('');
    const [alimen_abono, setAlimenAbono] = useState('');
    const [alimen_tope, setAlimenTope] = useState('');
    const [alimen_descripcion, setAlimenDescripcion] = useState('');

    const [mtto_cargo, setMttoCargo] = useState('');
    const [mtto_abono, setMttoAbono] = useState('');
    const [mtto_tope, setMttoTope] = useState('');
    const [mtto_descripcion, setMttoDescripcion] = useState('');

    const [noded_cargo, setNodedCargo] = useState('');
    const [noded_abono, setNodedAbono] = useState('');
    const [noded_tope, setNodedTope] = useState('');
    const [noded_descripcion, setNodedDescripcion] = useState('');

    const [iva_cargo, setIvaCargo] = useState('');
    const [iva_abono, setIvaAbono] = useState('');
    const [iva_descripcion, setIvaDescripcion] = useState('');


    useEffect( ()=> {

        if( esquema ){
        
            setDescripcion( esquema.descripcion );

            setAJCargo( esquema.anticipos_cr);
            setAJAbono(esquema.anticipos_ab);
            setAJTope(esquema.anticipos_tope);
            setAJDescripcion(esquema.anticipos_desc);

            setTransCargo( esquema.transporte_cr );
            setTransAbono( esquema. transporte_ab );
            setTransTope( esquema.transporte_tope);
            setTransDescripcion( esquema.transporte_desc);

            setRecepCargo( esquema.recepcion_cr);
            setRecepAbono( esquema.recepcion_ab );
            setRecepTope( esquema.recepcion_tope );
            setRecepDescripcion( esquema.recepcion_desc);

            setHospCargo( esquema.hospedaje_cr);
            setHospAbono( esquema.hospedaje_ab);
            setHospTope( esquema.hospedaje_tope);
            setHospDescripcion( esquema.hospedaje_desc);
            
            setAlimenCargo( esquema.alimentos_cr);
            setAlimenAbono( esquema.alimentos_ab);
            setAlimenTope( esquema.alimentos_tope);
            setAlimenDescripcion( esquema.alimentos_desc);

            setMttoCargo( esquema.mtto_vehiculos_cr);
            setMttoAbono( esquema.mtto_vehiculos_ab);
            setMttoTope( esquema.mtto_vehiculos_tope);
            setMttoDescripcion( esquema.mtto_vehiculos_desc);

            setNodedCargo( esquema.nodeducibles_cr);
            setNodedAbono( esquema.nodeducibles_ab);
            setNodedTope(esquema.nodeducibles_tope);
            setNodedDescripcion( esquema.nodeducibles_desc);

            setIvaCargo( esquema.iva_cr);
            setIvaAbono( esquema.iva_ab);
            setIvaDescripcion( esquema.iva_desc);

        }

    },[])



    const onGuardar = (e) => {
        e.preventDefault();

        const data = {

            descripcion,
            anticipos_cr: aj_cargo,
            anticipos_ab: aj_abono,
            anticipos_tope: aj_tope,
            anticipos_desc: aj_descripcion,

            transporte_cr: trans_cargo,
            transporte_ab: trans_abono,
            transporte_tope: trans_tope,
            transporte_desc: trans_descripcion,
        
            recepcion_cr: recep_cargo,
            recepcion_ab: recep_abono,
            recepcion_tope: recep_tope,
            recepcion_desc: recep_descripcion,
        
            hospedaje_cr: hosp_cargo,
            hospedaje_ab: hosp_abono,
            hospedaje_tope: hosp_tope,
            hospedaje_desc: hosp_descripcion,
        
            alimentos_cr: alimen_cargo,
            alimentos_ab: alimen_abono,
            alimentos_tope: alimen_tope,
            alimentos_desc: alimen_descripcion,
            
            nodeducibles_cr: noded_cargo,
            nodeducibles_ab: noded_abono,
            nodeducibles_tope: noded_tope,
            nodeducibles_desc:  noded_descripcion,
        
            mtto_vehiculos_cr: mtto_cargo,
            mtto_vehiculos_ab: mtto_abono,
            mtto_vehiculos_tope: mtto_tope,
            mtto_vehiculos_desc: mtto_descripcion,
        
            iva_cr: iva_cargo,
            iva_ab: iva_abono,
            iva_desc: iva_descripcion

        }
        onSubmit(data);
    }

    return (
        <form onSubmit={onGuardar}>
            <div>
                <div>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder='Descripcion del Esquema'
                    ></input>

                    <h3>Anticipos a justificar</h3>
                    <div>
                        <label>Cargo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label>Abono&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label>Importe dirario&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label>Nombre de la cuenta</label>
                    </div>
                    
                    <input
                        type="text"
                        value={aj_cargo}
                        onChange={(e) => setAJCargo(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={aj_abono}
                        onChange={(e) => setAJAbono(e.target.value)}
                        placeholder='Cuenta de abono'
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
                        value={trans_cargo}
                        onChange={(e) => setTransCargo(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={trans_abono}
                        onChange={(e) => setTransAbono(e.target.value)}
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
                        value={recep_cargo}
                        onChange={(e) => setRecepCargo(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={recep_abono}
                        onChange={(e) => setRecepAbono(e.target.value)}
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
                        value={hosp_cargo}
                        onChange={(e) => setHospCargo(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={hosp_abono}
                        onChange={(e) => setHospAbono(e.target.value)}
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
                        value={alimen_cargo}
                        onChange={(e) => setAlimenCargo(e.target.value)}
                        placeholder='Cuenta de cargo'
                    ></input>
                    <input
                        type="text"
                        value={alimen_abono}
                        onChange={(e) => setAlimenAbono(e.target.value)}
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
                            value={mtto_cargo}
                            onChange={(e) => setMttoCargo(e.target.value)}
                            placeholder='Cuenta de cargo'
                        ></input>
                        <input
                            type="text"
                            value={mtto_abono}
                            onChange={(e) => setMttoAbono(e.target.value)}
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
                            value={noded_cargo}
                            onChange={(e) => setNodedCargo(e.target.value)}
                            placeholder='Cuenta de cargo'
                        ></input>
                        <input
                            type="text"
                            value={noded_abono}
                            onChange={(e) => setNodedAbono(e.target.value)}
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
                            value={iva_cargo}
                            onChange={(e) => setIvaCargo(e.target.value)}
                            placeholder='Cuenta de cargo'
                        ></input>
                        <input
                            type="text"
                            value={iva_abono}
                            onChange={(e) => setIvaAbono(e.target.value)}
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