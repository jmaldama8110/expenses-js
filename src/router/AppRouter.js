import React from 'react';
import { Router, Switch } from 'react-router-dom';

import OrdenMisionAdd from '../components/ordenmision/OrdenMisionAdd';

import Home from '../components/Home';
import GeneralConfig from '../components/configuracion/general/GeneralConfig';
import Organigrama from '../components/configuracion/organigrama/Organigrama';

import UsuariosHome from '../components/configuracion/usuarios/UsuariosHome';
import UsuariosAdd from '../components/configuracion/usuarios/UsuariosAdd';
import UsuariosEdit from '../components/configuracion/usuarios/UsuariosEdit';

import PuestosAdd from "../components/configuracion/organigrama/puestos/PuestosAdd";
import PuestosEdit from "../components/configuracion/organigrama/puestos/PuestosEdit";

import DeptosAdd from '../components/configuracion/organigrama/deptos/DeptosAdd';
import DeptosEdit from '../components/configuracion/organigrama/deptos/DeptosEdit';

import Pago from '../components/configuracion/pago/Pago';
import Esquemas from '../components/configuracion/esquemas/Esquemas';
import Empresas from '../components/configuracion/empresas/Empresas';
import CentroCosto from '../components/configuracion/centrocosto/CentroCosto';
import OrdenMisionComprobacion from '../components/comprobacion/OrdenMisionComprobacion';

import { createBrowserHistory } from "history";
import OrdenMisionEdit from '../components/ordenmision/OrdenMisionEdit';
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
            <PrivateRoute path="/comprobacion" component={OrdenMisionComprobacion} exact={true} />
            
            <PrivateRoute path="/generalconfig" component={GeneralConfig} exact={true} />

            <PrivateRoute path="/organigrama" component={Organigrama} exact={true} />

            <PrivateRoute path="/puestosadd" component={PuestosAdd} exact={true} />
            <PrivateRoute path="/puestosedit/:id" component={PuestosEdit} exact={true} />

            <PrivateRoute path="/deptosadd" component={DeptosAdd} exact={true} />
            <PrivateRoute path="/deptosedit/:id" component={DeptosEdit} exact={true} />

            <PrivateRoute path="/usuarios" component={UsuariosHome} exact={true} />
            <PrivateRoute path="/usuariosadd" component={UsuariosAdd} exact={true} />
            <PrivateRoute path="/usuariosedit/:id" component={UsuariosEdit} exact={true} />
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
