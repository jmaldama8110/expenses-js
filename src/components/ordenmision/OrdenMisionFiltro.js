import React from 'react';

const OrdenMisionFiltro = () => {
    return (
        <form className="filtrosection">
            <label>Desde:</label>
            <input type="date"></input>

            <label>Hasta:</label>
            <input type="date"></input>

            <select>
                <option value="0">Filtrar por:</option>
                <option value="1">Empleado</option>
                <option value="2">Estatus</option>
                <option value="3">Centro de Costo</option>
            </select>

            <input type="text"></input>
            <input type="submit" value="Buscar"></input>
        </form>

        
    );
}

export { OrdenMisionFiltro as default };