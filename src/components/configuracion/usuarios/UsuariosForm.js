import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const UsuariosForm = ( { onSubmit, usuario} )=> {

    const [nombre, setNombre] = useState('');
    const [apellido_materno, setApellidoM] = useState('');
    const [apellido_paterno, setApellidoP] = useState('');
    const [email, setEmail] = useState('');
    const [passwordA, setPasswordA] = useState('');
    const [passwordB, setPasswordB] = useState('');

    const [renovarPass, setRenovarPass] = useState(true);

    const [nivelAut, setNivelAut] = useState("A");

    const [deptoId, setDeptoId] = useState('');
    const [depto, setDepto] = useState('');

    const [puestoId, setPuestoId] = useState('');
    const [puesto, setPuesto] = useState('');

    const [centroCostoId, setCentroCostoId] = useState('');
    const [centroCosto, setCentroCosto] = useState('');

    const [autorizadorAId, setAutorizadorAId] = useState('');
    const [autorizadorA, setAutorizadorA] = useState('');

    const [autorizadorBId, setAutorizadorBId] = useState('');
    const [autorizadorB, setAutorizadorB] = useState('');

    useEffect( ()=>{



        if(usuario){
            setNombre( usuario.nombre );
            setApellidoM(usuario.apellido_materno);
            setApellidoP(usuario.apellido_paterno);
            setEmail(usuario.email);
            setNivelAut( usuario.nivel_autorizacion );
            
            setDeptoId( usuario.depto[0]);
            setDepto( usuario.depto[1]);

            setPuestoId( usuario.puesto[0]);
            setPuesto( usuario.puesto[1]);

            setCentroCostoId( usuario.centro_costo[0]);
            setCentroCosto( usuario.centro_costo[1]);

            setAutorizadorAId( usuario.autorizador_a[0]);
            setAutorizadorA( usuario.autorizador_a[1]);

            setAutorizadorBId( usuario.autorizador_b[0]);
            setAutorizadorB( usuario.autorizador_b[1]);

            setRenovarPass( usuario.renovar_password);
            
        }
    },[])

    const onGuardar = (e)=> {
        e.preventDefault();
        
        const randId =  Math.floor(Math.random() * 10000 );
        
        const data = {
            id: !usuario ? randId.toString(): usuario.id,
            nombre: nombre,
            apellido_materno,
            apellido_paterno,
            email,
            password: passwordA,
            renovar_password: renovarPass,
            nivel_autorizacion: nivelAut,
            puesto: [puestoId,puesto],
            depto: [deptoId,depto],
            centro_costo: [centroCostoId,centroCosto],
            autorizador_a: [autorizadorAId, autorizadorA],
            autorizador_b: [autorizadorBId, autorizadorB]

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
                placeholder="Apellido Materno"
                value={apellido_materno}
                onChange={e => setApellidoM(e.target.value)}
            ></input>
            <input
                type="text"
                placeholder="Apellido Paterno"
                value={apellido_paterno}
                onChange={e => setApellidoP(e.target.value)}
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
                <label htmlFor="renovarpass">Actualizar al iniciar</label>
                <br/>

                {!renovarPass && 
                <p>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={passwordA}
                        onChange={e => setPasswordA(e.target.value)}
                    ></input>
                    <label>Repetir Contraseña</label>
                    <input
                        type="password"
                        value={passwordB}
                        onChange={e => setPasswordB(e.target.value)}
                    ></input>
                </p>}

            <div className="field">
                <p>Tipo Autorización</p>
                <input
                    id="requiereaut"
                    type="radio"
                    value="A"
                    name="nivelautoridad"
                    checked={ nivelAut === "A"}
                    onChange={ (e)=> setNivelAut(e.target.value)}
                >
                </input> <label htmlFor='requiereaut'>Requiere Autorizacion</label> 
                <input
                    id="norequiereaut"
                    type="radio"
                    value="X"
                    name="nivelautoridad"
                    checked={ nivelAut === "X"}
                    onChange={ (e)=> setNivelAut(e.target.value)}
                >
                </input> <label htmlFor='norequiereaut'>No requiere</label>
            </div>
            <select
                    value={deptoId} 
                    onChange={ (e)=> {
                            setDeptoId(e.target.value);
                            setDepto(e.target.options[e.target.selectedIndex].text);
                    } }
                    >
                <option value="10">Departamento</option>
                <option value="11">Direccion TI</option>
                <option value="12">Administracion y Finanzas</option>
                <option value="13">Direccion Comercial</option>
                <option value="14">Direcion Juridica</option>
            </select>
            <select 
                    value={puestoId} 
                    onChange={ (e)=> {
                            setPuestoId(e.target.value);
                            setPuesto(e.target.options[e.target.selectedIndex].text);
                    } }
                    >
                <option value="10">Puesto</option>
                <option value="11">Director</option>
                <option value="12">Soporte Jr</option>
                <option value="13">Coordinador Soporte</option>
                <option value="14">Gerente de Soporte</option>
            </select>
            <select 
                    value={centroCostoId} 
                    onChange={ (e)=> {
                            setCentroCostoId(e.target.value);
                            setCentroCosto(e.target.options[e.target.selectedIndex].text);
                    } }
                    >
                <option value="10">Centro de Costo</option>
                <option value="11">Direccion General</option>
                <option value="12">Suc Tonala</option>
                <option value="13">Region Soconusco</option>
                <option value="14">CI Puebla</option>
            </select>

            <select 
                    value={autorizadorAId} 
                    onChange={ (e)=> {
                            setAutorizadorAId(e.target.value);
                            setAutorizadorA(e.target.options[e.target.selectedIndex].text);
                    } }
                    >
                <option value="10">Autorizador A</option>
                <option value="11">Jose Manuel Gomez</option>
                <option value="12">Andres Morales</option>
                <option value="13">Roberto Chacon</option>
            </select>

            <select 
                    value={autorizadorBId} 
                    onChange={ (e)=> {
                            setAutorizadorBId(e.target.value);
                            setAutorizadorB(e.target.options[e.target.selectedIndex].text);
                    } }
                    >
                <option value="10">Autorizador B</option>
                <option value="11">Jose Manuel Gomez</option>
                <option value="12">Andres Morales</option>
                <option value="13">Roberto Chacon</option>
            </select>
                   
            <button>Guardar</button>
            <Link to="/usuarios">Cancelar</Link>
        </form>
    
    );
}

export { UsuariosForm as default };