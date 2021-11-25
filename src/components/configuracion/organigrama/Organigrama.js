import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeptosHome from './deptos/DeptosHome';

import PuestosHome from './puestos/PuestosHome';
import Loader from '../../Loader';
import { AxiosExpenseApi } from '../../../utils/axiosApi';

const Organigrama = () => {

    const [ loading, setLoading ] = useState(false);

    class TreeNode {
        constructor(id,titulo){
            this.id = id;
            this.titulo = titulo;
            this.hijos = [];
        }
    }

    function handleClick () {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    }
    

    const construirArbolHTML = (data, contenedor ) => {

        data.forEach( (nodo) => {

            const li = document.createElement('li');
            const span = document.createElement('span');
            const label = document.createElement('label');
            const ul = document.createElement('ul');

            if( nodo.hijos.length ){

                label.textContent = nodo.titulo;

                span.classList.toggle("caret");
                span.addEventListener("click",handleClick);
                ul.classList.toggle("nested");
                
                ul.classList.toggle("active");
                span.classList.toggle("caret-down");
                
                contenedor.appendChild(li);
                li.appendChild(span);
                li.appendChild(label)
                li.appendChild(ul);

                construirArbolHTML( nodo.hijos,ul);

            } else {
                
                label.textContent = nodo.titulo;
                li.appendChild(label);
                contenedor.appendChild(li);
            }

        })
    }

    useEffect( ()=>{

        let mounted = true;

        if( mounted ) {

            const contenedor = document.querySelector("#myUL");

            let lsPuestos = []

            setLoading(true);
            
            const axiosApi = AxiosExpenseApi();

            axiosApi.get('/puestos').then( res =>{
                lsPuestos = res.data
                const puestos = lsPuestos.map( (i) => {
                    return {
                        id: i._id,
                        titulo: i.titulo,
                        padre: i.parent[0]
                    } 
                });

                const setHijos = ( nodo ) => {
                    const h = puestos.filter( (i) => i.padre === nodo.id ).map( (obj) => new TreeNode(obj.id,obj.titulo));
                    nodo.hijos.push(...h);
                    h.forEach( (hijo) => setHijos(hijo) );
                }
        
                if( puestos )
                {
                    const root = new TreeNode( puestos[0].id, puestos[0].titulo );
                    setHijos(root);
                    construirArbolHTML([root], contenedor);
                }
                
            }).catch( e=>{
                alert(e);
            }).finally( ()=>{
                setLoading(false);
            })

        }

        return () => {

            const toggler = document.getElementsByClassName("caret");
            mounted = false;
            
            for (let i = 0; i < toggler.length; i++) {
                toggler[i].removeEventListener("click", handleClick );
              }

            // const contenedor = document.querySelector("#myUL");
            // const rootItem = contenedor.firstElementChild;
            // contenedor.removeChild(rootItem);
        } 

    },[]);


    return (
    <section>
        <h1>Organigrama de puestos</h1>

        <ul id="myUL"></ul>

        { loading && <Loader />}
        { !loading &&
        <div>
            <PuestosHome />
            <DeptosHome />
            <div>
                <Link to="/">Regresar</Link>
            </div>
        </div>}
    </section>
    );


}

export { Organigrama as default };