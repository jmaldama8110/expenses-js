import React from 'react';
import { Link } from 'react-router-dom';

const OrdenMisionItem = ({item}) => {
    return (
        <Link to={`/edit/${item.folio}`}>
            <div className="ordenitem">
                <p>{item.folio}</p>
                <p>{item.empleado}</p>
                <p>{item.centrocosto}</p>
                <p>{item.fecha_aplicacion}</p>
                <p>{item.descripcion}</p>

            </div>
        </Link>
    );
}


export { OrdenMisionItem as default };