import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const UsuariosForm = ( { onSubmit, usuario} )=> {

    const [nombre, setNombre] = useState('');
    const [apellido_materno, setApellidoM] = useState('');
    const [apellido_paterno, setApellidoP] = useState('');
    const [email, setEmail] = useState('');
    const [passwordA, setPasswordA] = useState('');
    const [passwordB, setPasswordB] = useState('');

    const [puestoId, setPuestoId] = useState('');
    const [puesto, setPuesto] = useState('');

    const [renovarPass, setRenovarPass] = useState(true);

    const [nivelAut, setNivelAut] = useState("A");

    const [puestos, setPuestos] = useState([]);

    const [empresas, setEmpresas] = useState([]);


    useEffect( ()=>{

        const lsPuestos = JSON.parse( localStorage.getItem("puestos") );
        const new_lspuestos = lsPuestos.filter( i => !i.asignado )
        new_lspuestos.unshift({
            id: "NA",
            titulo: "Puesto del usuario"
        });
        setPuestos(new_lspuestos);

        const lsEmpresas = JSON.parse( localStorage.getItem( "empresas" ) )

        if( lsEmpresas ) {
            setEmpresas(lsEmpresas.map( i => [ i.id, i.nombre, false ]));
        }


        if(usuario){
            setNombre( usuario.nombre );
            setApellidoM(usuario.apellido_materno);
            setApellidoP(usuario.apellido_paterno);
            setEmail(usuario.email);
            setNivelAut( usuario.nivel_autorizacion );
            setRenovarPass( usuario.renovar_password);

            if( usuario.puesto ){
                setPuestoId(usuario.puesto[0])
                setPuesto(usuario.puesto[1])
            }
            if( usuario.empresas) {
                setEmpresas(usuario.empresas);
            }

        
        }
    },[])

    const onGuardar = (e)=> {
        e.preventDefault();
        
        const randId =  Math.floor(Math.random() * 10000 );
        const idusuario = !usuario ? randId.toString(): usuario.id
        const data = {
            id: idusuario ,
            nombre: nombre,
            apellido_paterno,
            apellido_materno,
            email,
            password: passwordA,
            renovar_password: renovarPass,
            nivel_autorizacion: nivelAut,
            puesto: [puestoId, puesto],
            empresas
        }

        /////aqui actualiza el valor "asignado" en el puesto elegido para el usuario
        const local_puestos = JSON.parse( localStorage.getItem("puestos") );
        const new_puestos = local_puestos.map( p => {
            if( p.id === puestoId){
                return {
                    ...p,
                    asignado: true,
                    usuario: [idusuario, `${nombre} ${apellido_paterno} ${apellido_materno}`,email]
                }
            }
            else {
                return p;
            }
        });
        localStorage.setItem("puestos", JSON.stringify(new_puestos) );
        ///////////////////////////////////////////////////////////////////////////

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
                <select
                    value={puestoId}
                    onChange={ e =>{
                        setPuestoId(e.target.value);
                        setPuesto( e.target.options[e.target.selectedIndex].text );

                    }}
                >
                    {
                        puestos.map( p =>   <option
                                                key={p.id}
                                                value={p.id}
                                            >{p.titulo}
                                            </option>)
                    }
                </select>
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

                    <p></p>

                </div>
        
        
            </div>
            
            <button>Guardar</button>
            <Link to="/usuarios">Cancelar</Link>
        </form> 
    
    );
}

export { UsuariosForm as default };