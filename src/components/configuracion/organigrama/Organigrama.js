import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeptosHome from './deptos/DeptosHome';

import PuestosHome from './puestos/PuestosHome';


const Organigrama = () => {

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
        const contenedor = document.querySelector("#myUL");

        const lsPuestos = JSON.parse( localStorage.getItem("puestos") );
        if( !lsPuestos )  return;

        
        const puestos = lsPuestos.map( (i) => {return {id:i.id, titulo:i.titulo, padre: i.parent[0] } })   ;
        
        const setHijos = ( nodo ) => {
            const h = puestos.filter( (i) => i.padre === nodo.id ).map( (obj) => new TreeNode(obj.id,obj.titulo));
            nodo.hijos.push(...h);
            h.forEach( (hijo) => setHijos(hijo) );
        }

        if(puestos )
        {
            const root = new TreeNode( puestos[0].id, puestos[0].titulo );
            setHijos(root);
            construirArbolHTML([root], contenedor);
        }
        
        const toggler = document.getElementsByClassName("caret");
        let i = 0;
        
        for (i = 0; i < toggler.length; i++) {
          toggler[i].addEventListener("click", handleClick );
        }

        return () => {
            for (i = 0; i < toggler.length; i++) {
                toggler[i].removeEventListener("click", handleClick );
              }

              const rootItem = contenedor.firstElementChild;
              contenedor.removeChild(rootItem);
        }  

    },[]);


    return (
    <section>
        <h1>Organigrama de puestos</h1>

        <ul id="myUL">
        </ul>
        <PuestosHome />
        <DeptosHome />
        <div>
            <Link to="/">Regresar</Link>
        </div>
    </section>
    );


}

export { Organigrama as default };
