import React, { useEffect, useState } from 'react';

import Loader from './Loader';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API
});

const Login = (props) => {
    
    const [usuario, setUsuario ] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    

    const onLogin = (e)=> {
        e.preventDefault();

        setUsuario('');
        setContrasena('');
        setError('');

        setLoading(true);

        api.post('/users/login',{
            email: usuario,
            password: contrasena
        }).then( res => {
            sessionStorage.setItem("usuario",JSON.stringify({
                                                    info: res.data.usuario,
                                                    token: res.data.token } ));


            setLoading(false);
            setError('');
            props.history.push('/home');

        }).catch( e => {
            alert(e.message);
            setLoading(false);
            setUsuario('');
            setContrasena('');
        })
       
    }

  
    return (
        <div className="login">
            <h1>Inicia Sesion</h1>
            <form onSubmit={onLogin}> 
                <input  type="text"
                        value={usuario}
                        onChange={(e)=> setUsuario(e.target.value)} 
                        placeholder="Usuario / Correo electronico"
                        required>
                        
                </input>
                <input  type="password"
                        value={contrasena}
                        onChange={(e)=> setContrasena(e.target.value)}
                        placeholder="Password"
                        required>
                        
                </input>
                <input type="submit" value="Iniciar"></input>
                { error && <p>{error}</p> }
            </form>
            { loading && <Loader /> }

        </div>
    );
}

export { Login as default };