import React from 'react';
import { Router, Switch } from 'react-router-dom';

import OrdenMisionAdd from '../components/OrdenMisionAdd';

import Home from '../components/Home';
import GeneralConfig from '../components/configuracion/general/GeneralConfig';

import UsuariosHome from '../components/configuracion/usuarios/UsuariosHome';
import UsuariosAdd from '../components/configuracion/usuarios/UsuariosAdd';
import UsuariosEdit from '../components/configuracion/usuarios/UsuariosEdit';

import Empleados from '../components/configuracion/empleados/Empleados';
import Pago from '../components/configuracion/pago/Pago';
import Esquemas from '../components/configuracion/esquemas/Esquemas';
import Empresas from '../components/configuracion/empresas/Empresas';
import CentroCosto from '../components/configuracion/centrocosto/CentroCosto';

import { createBrowserHistory } from "history";
import OrdenMisionEdit from '../components/OrdenMisionEdit';
import Login from '../components/Login';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';


export const history =  createBrowserHistory(); 


const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
            <PrivateRoute path="/home" component={Home} exact={true} />
            <PrivateRoute path="/add" component={OrdenMisionAdd} exact={true} />
            <PrivateRoute path="/edit/:id" component={OrdenMisionEdit} exact={true} />
            <PrivateRoute path="/generalconfig" component={GeneralConfig} exact={true} />
            <PrivateRoute path="/usuarios" component={UsuariosHome} exact={true} />
            <PrivateRoute path="/usuariosadd" component={UsuariosAdd} exact={true} />
            <PrivateRoute path="/usuariosedit/:id" component={UsuariosEdit} exact={true} />
            <PrivateRoute path="/empleados" component={Empleados} exact={true} />
            <PrivateRoute path="/metodopago" component={Pago} exact={true} />
            <PrivateRoute path="/esquemas" component={Esquemas} exact={true} />
            <PrivateRoute path="/empresas" component={Empresas} exact={true} />
            <PrivateRoute path="/centrocosto" component={CentroCosto} exact={true} />
      
            <PublicRoute path="/" component={Login} exact={true} />
            
        </Switch>
    </div>

    </Router>

);

export default AppRouter;
