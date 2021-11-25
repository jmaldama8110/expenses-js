import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AxiosExpenseApi } from '../../../../utils/axiosApi';
import Loader from '../../../Loader';

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

    const [loading,setLoading] = useState(false);
    
    useEffect( ()=>{
        let mounted = true;

        if( mounted ){
            setLoading(true);
            const axiosApi = AxiosExpenseApi();

            axiosApi.get('/deptos').then( (res) =>{
                const lsDeptos = res.data;
                lsDeptos.unshift({
                    _id: "",
                    titulo: "Departamento"
                });

                setDeptos(lsDeptos);
                setDeptoId("");
    
            }).catch( (e)=>{
                    alert(e);
            }).finally( ()=>{
                setLoading(false);
            });

            setLoading(true);
            axiosApi.get('/puestos').then( (res) =>{
                const lsPuestos = res.data;
                lsPuestos.unshift({
                    _id: "",
                    titulo: "Puesto"
                })
                setPuestos(lsPuestos);
                setParentId("");
            }).catch( (e)=>{
                    alert(e);
            }).finally( ()=>{
                setLoading(false);
            })
            
            if(puesto){

                setTitulo(puesto.titulo);
                
                setDeptoId( puesto.depto[0]);
                setDepto( puesto.depto[1]);

                setParentId( puesto.parent[0]);
                setParent( puesto.parent[1]);

                setIsRoot(puesto.isroot);
                setAsignado(puesto.asignado);
            }
        }

        return () => mounted = false;
    },[])

    const onGuardar = (e)=> {
        e.preventDefault();
                
        const data = {
            titulo: titulo,
            depto: [deptoId,depto],
            parent: [parentId, parent],
            isroot: isroot,
            asignado: asignado
        }
        onSubmit(data);

    }

    return (
    <div>

    { loading && <Loader /> }
     { !loading &&   <form onSubmit={onGuardar}>
            <p>Titulo del puesto</p>
            <input
                type="text"
                placeholder="Titulo del puesto"
                value={titulo}
                required
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
                    required
                    value={deptoId} 
                    onChange={ (e)=> {
                            setDeptoId(e.target.value);
                            setDepto(e.target.options[e.target.selectedIndex].text);
                        
                    } }
                    >
                {
                    deptos.map( d =>    <option
                                            key={d._id}
                                            value={d._id}
                                        >
                                        {`${d.titulo}`}
                                        </option>)
                }

            </select>

            { !isroot && 
            <div>
                <p>Jefe inmediato</p>
                <select 
                        required
                        value={parentId}
                        onChange={ (e)=> {
                                setParentId(e.target.value);
                                setParent(e.target.options[e.target.selectedIndex].text);
                        } }
                        >
                        {
                            puestos.map( p =>   <option
                                                    key={p._id}
                                                    value={p._id}
                                                >
                                                    {p.titulo}

                                                </option>)
                        }


                </select>
            </div>}


            <button>Guardar</button>
            <Link to="/organigrama">Cancelar</Link>
        </form> }

    </div>
    );
}

export { PuestosForm as default };