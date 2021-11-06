import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const PuestosForm = ( { onSubmit, puesto} )=> {

    const [titulo, setTitulo] = useState('');

    const [deptoId, setDeptoId] = useState('');
    const [depto, setDepto] = useState('');

    const [parentId, setParentId] = useState('');
    const [parent, setParent] = useState('');

    const [isroot, setIsRoot] = useState(false);
    
    const [asignado, setAsignado] = useState(false);

    const [deptos, setDeptos] = useState([]);
    const [puestos, setPuestos] = useState([]);
    
    useEffect( ()=>{

        const lsDeptos = JSON.parse( localStorage.getItem("deptos"));
        lsDeptos.unshift({
            id: "NA",
            titulo: ""
        });
        setDeptos(lsDeptos);
        setDeptoId("NA");

        const lsPuestos = JSON.parse( localStorage.getItem("puestos"));
        lsPuestos.unshift({
            id: "NA",
            titulo: ""
        });
        setPuestos(lsPuestos)
        setParentId("NA");
        
        if(puesto){

            setTitulo(puesto.titulo);
            
            setDeptoId( puesto.depto[0]);
            setDepto( puesto.depto[1]);

            setParentId( puesto.parent[0]);
            setParent( puesto.parent[1]);

            setIsRoot(puesto.isroot);
            setAsignado(puesto.asignado);

            
        }
    },[])

    const onGuardar = (e)=> {
        e.preventDefault();
        
        const randId =  Math.floor(Math.random() * 10000 );
        
        const data = {
            id: !puesto ? randId.toString(): puesto.id,
            titulo: titulo,
            depto: [deptoId,depto],
            parent: [parentId, parent],
            isroot: isroot,
            asignado: asignado
        }
        onSubmit(data);

    }

    return (
        <form onSubmit={onGuardar}>
            <p>Titulo del puesto</p>
            <input
                type="text"
                placeholder="Titulo del puesto"
                value={titulo}
                onChange={ (e) => setTitulo(e.target.value)}
            ></input>

            <input
                    id="isroot"
                    type="checkbox"
                    
                    checked={ isroot }
                    onChange={ e => setIsRoot(e.target.checked) }
                       
            ></input>
            <label htmlFor="isroot">Usuario raiz</label>
            <br/>

            <input
                    id="asignado"
                    type="checkbox"
                    disabled
                    checked={ asignado }
                    onChange={ e => setAsignado(e.target.checked) }
                       
            ></input>
            <label htmlFor="asignado">Asignado a Usuario</label>
            <br/>


           <p>Departamento</p>
            <select
                    value={deptoId} 
                    onChange={ (e)=> {
                            setDeptoId(e.target.value);
                            setDepto(e.target.options[e.target.selectedIndex].text);
                    } }
                    >
                {
                    deptos.map( d =>    <option
                                            key={d.id}
                                            value={d.id}
                                        >
                                        {`${d.titulo}`}
                                        </option>)
                }

            </select>

            { !isroot && <div>
            <p>Jefe inmediato</p>
            <select 
                    value={parentId} 
                    onChange={ (e)=> {
                            setParentId(e.target.value);
                            setParent(e.target.options[e.target.selectedIndex].text);
                    } }
                    >
                    {
                        puestos.map( p =>   <option
                                                key={p.id}
                                                value={p.id}
                                            >
                                                {p.titulo}

                                            </option>)
                    }


            </select>
            </div>}


            <button>Guardar</button>
            <Link to="/organigrama">Cancelar</Link>
        </form>
    
    );
}

export { PuestosForm as default };