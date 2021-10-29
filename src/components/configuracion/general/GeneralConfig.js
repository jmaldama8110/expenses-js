import React from 'react';
import Costokm from './Costokm';
import { Link } from 'react-router-dom';

const GeneralConfig = () => {
    return (
        <>
            <h1>Configuraciones Generales</h1>
            <Costokm />
            <Link to="/home">Regresar</Link>
        </>
    );
}

export { GeneralConfig as default };
