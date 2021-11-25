import React from 'react';
import { Link } from 'react-router-dom';

const OrdenMisionItem = ({item}) => {

    const idToFolio = (str) =>{
        return str.substring(20);
    }
    
    
    return (
        <Link to={`/edit/${item._id}`}>
            <div className="ordenitem">
                <p>{idToFolio(item._id)}</p>
                <p>{item.empleado[1]}</p>
                <p>{item.centrocosto}</p>
                <p>{item.fecha_aplicacion}</p>
                <p>{item.estatus[1]}</p>

            </div>
        </Link>
    );
}


export { OrdenMisionItem as default }