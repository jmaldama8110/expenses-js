import React,{useContext} from "react";
import UsuariosItem from './UsuariosItem';

import ExpensesContext from '../../../context/ExpensesContext';;

const UsuariosLista = () => {

    const { usuarios } = useContext(ExpensesContext);

    return (
        <div>
            <div className="gridflex">
                <p className="headerlabel">id</p>
                <p className="headerlabel">nombre</p>
                <p className="headerlabel">email</p>

            </div>
            {
            usuarios.map( usu => 
                    <UsuariosItem 
                        key={usu.id}
                        usuario={usu}
                    /> )
            }
        </div>
    );
}

export { UsuariosLista as default };