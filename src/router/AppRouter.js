import React from 'react';
import { Router, Switch } from 'react-router-dom';

import OrdenMisionAdd from '../components/ordenmision/OrdenMisionAdd';

import Home from '../components/Home';
import GeneralConfig from '../components/configuracion/general/GeneralConfig';
import Organigrama from '../components/configuracion/organigrama/Organigrama';
import Preferences from '../components/preferences/Preferences';

import UsuariosHome from '../components/configuracion/usuarios/UsuariosHome';
import UsuariosAdd from '../components/configuracion/usuarios/UsuariosAdd';
import UsuariosEdit from '../components/configuracion/usuarios/UsuariosEdit';

import PuestosAdd from "../components/configuracion/organigrama/puestos/PuestosAdd";
import PuestosEdit from "../components/configuracion/organigrama/puestos/PuestosEdit";

import DeptosAdd from '../components/configuracion/organigrama/deptos/DeptosAdd';
import DeptosEdit from '../components/configuracion/organigrama/deptos/DeptosEdit';

import Pago from '../components/configuracion/pago/Pago';


import EmpresasHome from '../components/configuracion/empresas/EmpresasHome';
import EmpresasAdd from '../components/configuracion/empresas/EmpresasAdd';
import EmpresasEdit from '../components/configuracion/empresas/EmpresasEdit';

import CentroCosto from '../components/configuracion/centrocosto/CentroCosto';

import EsquemasHome from '../components/configuracion/esquemas/EsquemasHome';
import EsquemasEdit from '../components/configuracion/esquemas/EsquemasEdit';
import EsquemasAdd from '../components/configuracion/esquemas/EsquemasAdd';

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
            
            <PrivateRoute path="/generalconfig" component={GeneralConfig} exact={true} />
            <PrivateRoute path="/preferences" component={Preferences} exact={true} />

            <PrivateRoute path="/organigrama" component={Organigrama} exact={true} />

            <PrivateRoute path="/puestosadd" component={PuestosAdd} exact={true} />
            <PrivateRoute path="/puestosedit/:id" component={PuestosEdit} exact={true} />

            <PrivateRoute path="/deptosadd" component={DeptosAdd} exact={true} />
            <PrivateRoute path="/deptosedit/:id" component={DeptosEdit} exact={true} />

            <PrivateRoute path="/usuarios" component={UsuariosHome} exact={true} />
            <PrivateRoute path="/usuariosadd" component={UsuariosAdd} exact={true} />
            <PrivateRoute path="/usuariosedit/:id" component={UsuariosEdit} exact={true} />
            <PrivateRoute path="/metodopago" component={Pago} exact={true} />

            <PrivateRoute path="/empresas" component={EmpresasHome} exact={true} />
            <PrivateRoute path="/empresasadd" component={EmpresasAdd} exact={true} />
            <PrivateRoute path="/empresasedit/:id" component={EmpresasEdit} exact={true} />


            <PrivateRoute path="/centrocosto" component={CentroCosto} exact={true} />

            <PrivateRoute path="/esquemas" component={EsquemasHome} exact={true} />
            <PrivateRoute path="/esquemasadd" component={EsquemasAdd} exact={true} />
            <PrivateRoute path="/esquemasedit/:id" component={EsquemasEdit} exact={true} />
      
            <PublicRoute path="/" component={Login} exact={true} />
            
        </Switch>
    </div>

    </Router>

);

export default AppRouter;
