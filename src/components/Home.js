import React from 'react';
import {Link} from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <h1>Bienvenido a Control de Gastos!</h1>
            <Link to="/ordenmision">Orden de Mision</Link>
        </div>
    );
}

export default Home;
