import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../Loader';
import { AxiosExpenseApi, generatePassword } from '../../../utils/axiosApi';


const UsuariosForm = ({ onSubmit, usuario }) => {

    const [loading, setLoading] = useState(false);

    const [nombre, setNombre] = useState('');
    const [apellido_materno, setApellidoM] = useState('');
    const [apellido_paterno, setApellidoP] = useState('');
    const [email, setEmail] = useState('');
    const [passwordA, setPasswordA] = useState('');
    const [passwordB, setPasswordB] = useState('');

    const [puestoId, setPuestoId] = useState('');
    const [puesto, setPuesto] = useState('');

    const [deptoId, setDeptoId] = useState('');
    const [depto, setDepto] = useState('');

    const [puedeCambiarEsquema, setPuedeCambiarEsquema] = useState(false);

    const [renovarPass, setRenovarPass] = useState(true);

    const [nivelAut, setNivelAut] = useState("X");

    const [puestos, setPuestos] = useState([]);
    const [empresas, setEmpresas] = useState([]);


    useEffect(() => {

        const loadData = async () => {

            try {
                setLoading(true);
                const axiosApi = AxiosExpenseApi();
                let res = await axiosApi.get('/puestos');
                const puestosListaTemp = res.data.filter(i => (!i.asignado));

                // agrega el puesto del Usuario a editar o un vacio
                const selectOptionData = {
                    _id: '',
                    titulo: 'Seleccione Puesto'
                }

                if (usuario && usuario.puesto && usuario.puesto.length > 1) {
                    selectOptionData._id = usuario.puesto[0];
                    selectOptionData.titulo = usuario.puesto[1];
                }
                puestosListaTemp.unshift(selectOptionData);
                setPuestos(puestosListaTemp);

                res = await axiosApi.get('/empresas');
                const empresasTmp = res.data.map(i => [i._id, i.nombre, false]);
                setEmpresas(empresasTmp);

                if (usuario) {

                    setNombre(usuario.nombre);
                    setApellidoM(usuario.apellido_materno);
                    setApellidoP(usuario.apellido_paterno);
                    setEmail(usuario.email);
                    setNivelAut(usuario.nivel_autorizacion);
                    setRenovarPass(usuario.renovar_password);
                    setPuedeCambiarEsquema(usuario.puedeCambiarEsquema);

                    if (usuario.puesto) {
                        setPuestoId(usuario.puesto[0]);
                        setPuesto(usuario.puesto[1]);
                    }
                    if (usuario.depto) {
                        setDeptoId(usuario.depto[0]);
                        setDepto(usuario.depto[1]);
                    }

                    if (usuario.empresas) {
                        setEmpresas(usuario.empresas);
                    }
                }
                else {
                    /// runs only when we are adding a new usuario
                    const randpass = generatePassword(6);
                    setPasswordA(randpass);
                    setPasswordB(randpass);

                }
                setLoading(false);
            }
            catch (e) {
                alert(e);
            }

        }

        loadData();

    }, [])

    const onGuardar = (e) => {
        e.preventDefault();

        if( passwordA !== passwordB ){
            alert('Las contraseñas no coinciden entre sí!, por favor revisa')
            return;
        }

        const empresasTmp = empresas.filter( emp => emp[2] === true );
        
        if( !empresasTmp.length ){
            alert('Al menos, una empresa debe asignarse al usuario! para poder operar');
            return;
        }

        const empresa_default = {
            id: empresas[0][0],
            nombre: empresas[0][1]
        }


        const data = {
            nombre,
            apellido_paterno,
            apellido_materno,
            email,
            password: passwordA,
            renovar_password: renovarPass,
            puede_cambiar_esquema: puedeCambiarEsquema,
            nivel_autorizacion: nivelAut,
            puesto: [puestoId, puesto],
            depto: [deptoId, depto],
            empresas,
            preferences: {
                ...empresa_default
            }
        }

        if( usuario  ){
            delete data.password;
        }
        onSubmit(data);

    }

    return (
        <div>

            {loading && <Loader />}
            {!loading &&
                <form onSubmit={onGuardar}>
                    <input
                        type="text"
                        placeholder="Nombre(s)"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        placeholder="Apellido Paterno"
                        value={apellido_paterno}
                        onChange={e => setApellidoP(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        placeholder="Apellido Materno"
                        value={apellido_materno}

                        onChange={e => setApellidoM(e.target.value)}
                    ></input>
                    <input
                        type="email"
                        placeholder="Correo Electronico"
                        disabled={usuario}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></input>


                    <input
                        id="renovarpass"
                        type="checkbox"
                        checked={renovarPass}
                        onChange={e => setRenovarPass(e.target.checked)}

                    ></input>
                    <label htmlFor="renovarpass">Solicitar nueva contrasena al iniciar</label>

                    <input
                        id="puedecambiaresquema"
                        type="checkbox"
                        checked={puedeCambiarEsquema}
                        onChange={e => setPuedeCambiarEsquema(e.target.checked)}
                    ></input>
                    <label htmlFor="puedecambiaresquema">Permitir cambiar esquema</label>

                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={passwordA}
                        disabled={usuario}
                        onChange={e => setPasswordA(e.target.value)}
                    ></input>

                    <input
                        type="password"
                        value={passwordB}
                        disabled={usuario}
                        onChange={e => setPasswordB(e.target.value)}
                    ></input>


                    {!usuario &&
                        <label>
                            Password temporal:<strong>{passwordA}</strong>
                        </label>}

                    <div className="field">
                        <p>Nivel del Empleado</p>

                        <label htmlFor='nivelninguno'>
                            <input
                                id="nivelninguno"
                                type="radio"
                                value="X"
                                name="nivelautoridad"
                                checked={nivelAut === "X"}
                                onChange={(e) => setNivelAut(e.target.value)}
                            >
                            </input>Niguno</label>

                        <label htmlFor='nivelA'>
                            <input
                                id="nivelA"
                                type="radio"
                                value="A"
                                name="nivelautoridad"
                                checked={nivelAut === "A"}
                                onChange={(e) => setNivelAut(e.target.value)}
                            >
                            </input>Nivel A</label>

                        <label htmlFor='nivelB'>
                            <input
                                id="nivelB"
                                type="radio"
                                value="B"
                                name="nivelautoridad"
                                checked={nivelAut === "B"}
                                onChange={(e) => setNivelAut(e.target.value)}
                            >
                            </input>Nivel B</label>

                        <select
                            value={puestoId}
                            required
                            onChange={e => {

                                setPuestoId(e.target.value);
                                setPuesto(e.target.options[e.target.selectedIndex].text);

                                const puestoTmp = puestos.find(i => i._id === e.target.value);
                                setDeptoId(puestoTmp.depto[0]);
                                setDepto(puestoTmp.depto[1]);
                            }}
                        >
                            {
                                puestos.map(p => <option
                                    key={p._id}
                                    value={p._id}
                                >{p.titulo}
                                </option>)
                            }
                        </select>


                        <div>

                            <p>Empresas permitidas:</p>
                            {
                                empresas.map(emp => <label key={emp[0]}><input
                                    type='checkbox'
                                    key={emp[0]}
                                    checked={emp[2]}
                                    onChange={(e) => {
                                        const x = empresas.find((i) => i[0] === emp[0]);
                                        x[2] = e.target.checked;

                                        const temp_data = empresas.map(emp => {
                                            if (emp[0] === x[0]) {
                                                return x;
                                            }
                                            else {
                                                return emp;
                                            }
                                        });

                                        setEmpresas(temp_data);


                                    }}
                                ></input>{emp[1]}</label>)
                            }



                        </div>


                    </div>

                    <button>Guardar</button>
                    <Link to="/usuarios">Cancelar</Link>
                </form>}
        </div>

    );
}

export { UsuariosForm as default };