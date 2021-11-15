import React from 'react';
import { Link } from 'react-router-dom';

const OrdenMisionItem = ({item}) => {
    return (
        <Link to={`/edit/${item.folio}`}>
            <div className="ordenitem">
                <p>{item.folio}</p>
                <p>{item.empleado[1]}</p>
                <p>{item.centrocosto}</p>
                <p>{item.fecha_aplicacion}</p>
                <p>{item.estatus[1]}</p>

            </div>
        </Link>
    );
}


export { OrdenMisionItem as default };