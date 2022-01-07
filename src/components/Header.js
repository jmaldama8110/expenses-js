import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { history} from '../router/AppRouter';

const Header = () => {


    const handlClick = e => {

        // comprueba si el click corresponde al elemento con el data-dropdown-button
        const isDropdownButton = e.target.matches("[data-dropdown-button]") ;
        
        // con esta linea ignora por completo el click, ya que significa que es dentro de un dropdown
        // valida si no es click sobre el data-dropdown-button && el click cae fuera de recuadro data-dropdown
        const closeDropdown = e.target.closest("[data-dropdown]");

        
        if( !isDropdownButton && closeDropdown != null ) {
            return;
        }


        /// buscar el dropdown activo y lo deja activo
        let currentDropdown;

        if( isDropdownButton ){
            currentDropdown = e.target.closest("[data-dropdown]") ;
            currentDropdown.classList.toggle("active");
        }

        document.querySelectorAll("[data-dropdown].active").forEach( dropdown => {
                if( dropdown === currentDropdown ) return;
                dropdown.classList.remove("active");
        })
    }

    useEffect( ()=> {
        // En cada click en el body principal
        window.addEventListener("click", handlClick);

        return () => {
            window.removeEventListener("click",handlClick);
        }


    },[]);

    const handleCerrarSesion = () =>{

        sessionStorage.removeItem("usuario");
        alert('logout functions needs to be defined!');

        history.push('/');
    }

    return (
        <header className="header">

            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>Misiones</button>
                <div className="dropdown-menu">
                    <Link className="link" to="/add">Nueva Mision</Link>
                    <Link className="link" to="/add">Anticipos</Link>
                    <Link className="link" to="/comprobacion">Comprobacion</Link>
                </div>
            </div>

            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>Configuración</button>
                <div className="dropdown-menu">
                    <Link className="link" to="/generalconfig">General</Link>
                    <Link className="link" to="/organigrama">Organigrama</Link>
                    <Link className="link" to="/usuarios">Usuarios</Link>
                    <Link className="link" to="/metodopago">Metodo de pago</Link>
                    <Link className="link" to="/esquemas">Esquemas Contables</Link>
                    <Link className="link" to="/centrocosto">Centros de Costo</Link>
                    <Link className="link" to="/empresas">Empresas</Link>
                    <Link className="link" to="/bancos">Bancos</Link>
                    <Link className="link" to="/varios">Gastos Varios</Link>
                    
                </div> 
            </div>

            <div className="dropdown" data-dropdown>
                <button className="link" data-dropdown-button>Mis Preferencias</button>
                <div className="dropdown-menu">
                    <Link className="link" to="/preferences">Preferencias</Link>
                    <button className="link" onClick={handleCerrarSesion}>Cerrar Sesion</button>
                </div> 
            </div>

            
        </header>
    );

}

export { Header as default };