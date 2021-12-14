import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../Loader';
import { AxiosExpenseApi, generatePassword } from '../../../utils/axiosApi';

const UsuariosForm = ( { onSubmit, usuario} )=> {

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

    const [centrocostoId, setCentroCostoId] = useState('');
    const [centroCosto, setCentroCosto] = useState('');

    const [esquemaId, setEsquemaId] = useState('');
    const [esquema, setEsquema] = useState('');
    
    const [puedeCambiarEsquema, setPuedeCambiarEsquema] = useState(false);

    const [renovarPass, setRenovarPass] = useState(true);   

    const [nivelAut, setNivelAut] = useState("A");

    const [puestos, setPuestos] = useState([]);
    const [empresas, setEmpresas] = useState([]);


    useEffect( ()=>{

        const axiosApi = AxiosExpenseApi();

        setLoading(true);
        axiosApi.get('/puestos').then( (res)=>{

            const temp = res.data.filter( i => !i.asignado );
            temp.unshift({
                _id: "",
                titulo: "Puesto del empleado"
            });

            setPuestos(temp);

        }).catch(e =>{
            alert(e);
        }).finally( ()=>{
            setLoading(false);
        })
        
 
        axiosApi.get('/empresas').then( (res) =>{
            const temp = res.data.map( i => [ i._id, i.nombre, false ]);
            setEmpresas( temp );
            
            if(usuario){

                setNombre( usuario.nombre );
                setApellidoM(usuario.apellido_materno);
                setApellidoP(usuario.apellido_paterno);
                setEmail(usuario.email);
                setNivelAut( usuario.nivel_autorizacion );
                setRenovarPass( usuario.renovar_password);
                setPuedeCambiarEsquema( usuario.puedeCambiarEsquema);
    
                if( usuario.puesto ){
                    setPuestoId(usuario.puesto[0])
                    setPuesto(usuario.puesto[1])
                }

                if( usuario.empresas) {
                    setEmpresas(usuario.empresas);
                }        
            }
            else {
                /// runs only when we are adding a new usuario
                const randpass = generatePassword(6);
                setPasswordA(randpass);
                setPasswordB(randpass);

            }

        }).catch( e => {
            alert(e);
        }).finally( () =>{
            setLoading(false);
        })


    },[])

    const onGuardar = (e)=> {
        e.preventDefault();

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
            centrocosto:[centrocostoId, centroCosto],
            esquema: [ esquemaId, esquema],
            empresas,
            preferences: {
                ...empresa_default
            }
        }

        onSubmit(data);

    }

    return (
       <form onSubmit={onGuardar}>
            <input
                type="text"
                placeholder="Nombre(s)"
                value={nombre}
                onChange={ (e) => setNombre(e.target.value)}
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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                ></input>
                
                <br/>
                <input
                    id="renovarpass"
                    type="checkbox"
                    
                    checked={ renovarPass }
                    onChange={ e => setRenovarPass(e.target.checked) }
                       
                ></input>
                <label htmlFor="renovarpass">Solcitar nueva contrasena al iniciar</label>
                <br/>
                <input
                    id="puedecambiaresquema"
                    type="checkbox"
                    
                    checked={ puedeCambiarEsquema }
                    onChange={ e => setPuedeCambiarEsquema(e.target.checked) }
                       
                ></input>
                <label htmlFor="puedecambiaresquema">Permitir cambiar esquema</label>
                <br/>

                
                <p>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={passwordA}
                        onChange={e => setPasswordA(e.target.value)}
                    ></input>
                    
                   {!usuario && <input
                        type="password"
                        value={passwordB}
                        onChange={e => setPasswordB(e.target.value)}
                    ></input>}

                    {!usuario && <div>
                        Password temporal:<strong>{passwordA}</strong>
                    </div>}
                </p>

            <div className="field">
                <p>Nivel del Empleado</p>

                <label htmlFor='nivelninguno'>
                <input
                    id="nivelninguno"
                    type="radio"
                    value="X"
                    name="nivelautoridad"
                    checked={ nivelAut === "X"}
                    onChange={ (e)=> setNivelAut(e.target.value)}
                >
                </input>Niguno</label> 

                <label htmlFor='nivelA'>
                <input
                    id="nivelA"
                    type="radio"
                    value="A"
                    name="nivelautoridad"
                    checked={ nivelAut === "A"}
                    onChange={ (e)=> setNivelAut(e.target.value)}
                >
                </input>Nivel A</label>

                <label htmlFor='nivelB'>
                <input
                    id="nivelB"
                    type="radio"
                    value="B"
                    name="nivelautoridad"
                    checked={ nivelAut === "B"}
                    onChange={ (e)=> setNivelAut(e.target.value)}
                >
                </input>Nivel B</label>

                <p>
                    <select
                        value={puestoId}
                        onChange={ e =>{

                            setPuestoId(e.target.value);
                            setPuesto( e.target.options[e.target.selectedIndex].text );
                            
                            const puestoTmp = puestos.find( i => i._id === e.target.value );
                        
                            setDeptoId('');
                            setDepto('');

                            if( puestoTmp.depto ){
                                setDeptoId( puestoTmp.depto[0] );
                                setDepto( puestoTmp.depto[1] );

                                setCentroCostoId( puestoTmp.centrocosto[0] );
                                setCentroCosto( puestoTmp.centrocosto[1] );

                                setEsquemaId( puestoTmp.esquema[0] );
                                setEsquema( puestoTmp.esquema[1] );

                            }
                        }}
                    >
                        {
                            puestos.map( p =>   <option
                                                    key={p._id}
                                                    value={p._id}
                                                >{p.titulo}
                                                </option>)
                        }
                    </select>
                </p>


                <div>
                    
                    <h3>Empresas permitidas:</h3>
                    {
                        empresas.map( emp => <label key={emp[0]}><input
                                                    type='checkbox'
                                                    key={emp[0]}
                                                    checked={emp[2]}
                                                    onChange={ (e) => {
                                                            const x = empresas.find( (i) => i[0] === emp[0] );
                                                            x[2] = e.target.checked;
                                                            
                                                            const temp_data = empresas.map( emp => {
                                                                if( emp[0] === x[0] ){
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
            { loading && <Loader />}
            { ! loading && <button>Guardar</button>}
            <Link to="/usuarios">Cancelar</Link>
        </form> 
    
    );
}

export { UsuariosForm as default };