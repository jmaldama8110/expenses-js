import React from 'react';

const OrdenMisionItem = ({item}) => {
    return (
        <div className="ordenitem">
            <p>{item.folio}</p>
            <p>{item.empleado}</p>
            <p>{item.centrocosto}</p>
            <p>{item.fecha_aplicacion}</p>
            <p>{item.descripcion}</p>

        </div>
    );
}

export { OrdenMisionItem as default };