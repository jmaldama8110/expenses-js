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
            const ul = document.createElement('ul');

            if( nodo.hijos.length ){

                span.textContent = nodo.titulo;
                span.classList.toggle("caret");
                ul.classList.toggle("nested");
                // ul.classList.toggle("active");

                contenedor.appendChild(li);
                li.appendChild(span);
                li.appendChild(ul);

                construirArbolHTML( nodo.hijos,ul);

            } else {
                
                li.textContent = nodo.titulo;
                contenedor.appendChild(li);
            }

        })
    }

    useEffect( ()=>{
        const contenedor = document.querySelector("#myUL");

        const puestos = JSON.parse( localStorage.getItem("puestos") )
                        .map( (i) => {return {id:i.id, titulo:i.titulo, padre: i.parent[0] } })   ;
        
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

    const data = [

        {
            titulo: "Director General",
            nodo_id: 1,
            tieneHijo: true,
            hijos: [
                {
                    titulo: "Director Comercial",
                    nodo_id: 11,
                    tieneHijo: true,
                    hijos: [
                        {
                            titulo: "Subdirector Soconusco",
                            nodo_id: 111,
                            tieneHijo: true,
                            hijos: [
                                {
                                    titulo: "Regional Norte",
                                    nodo_id: 1111,
                                    tieneHijo: true,
                                    hijos: [
                                        {
                                            titulo: "Gerente Suc Tonala",
                                            nodo_id: 11111,
                                            tieneHijo: true,
                                            hijos: [
                                                {
                                                    titulo: "Coordinador 1",
                                                    nodo_id: 111111,
                                                    tieneHijo: true,
                                                    hijos: [
                                                        {
                                                            titulo: "Oficial 01",
                                                            nodo_id: 1111111,
                                                            tieneHijo: false
                                                        },
                                                        {
                                                            titulo: "Oficial 02",
                                                            nodo_id: 1111111,
                                                            tieneHijo: false
                                                        },
                                                        {
                                                            titulo: "Oficial 03",
                                                            nodo_id: 1111111,
                                                            tieneHijo: false
                                                        }

                                                    ]
                                                },
                                                {
                                                    titulo: "Auxiliar Admin",
                                                    nodo_id: 11112,
                                                    tieneHijo: false
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]

                        }
                    ]
                },
                {
                    titulo: "Direccion Juridica",
                    nodo_id: 20000,
                    tieneHijo: true,
                    hijos: [
                        {
                            titulo: "Oficial de Cumplimiento",
                            nodo_id: 20010,
                            tieneHijo: false
                        },
                        {
                            titulo: "Asuntos Juridicos",
                            nodo_id: 20010,
                            tieneHijo: false
                        }
                    ]
                }
                
            ]
        }

    ]

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
