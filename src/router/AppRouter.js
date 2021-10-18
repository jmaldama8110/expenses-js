import React from 'react';
import { Router, Switch } from 'react-router-dom';

import OrdenMisionAdd from '../components/OrdenMisionAdd';

import Home from '../components/Home';
import ConfiguracionHome from '../components/catalogs/ConfiguracionHome';

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
            <PrivateRoute path="/edit" component={OrdenMisionEdit} exact={true} />
            <PrivateRoute path="/config" component={ConfiguracionHome} exact={true} />
            <PublicRoute path="/" component={Login} exact={true} />
            
        </Switch>
    </div>

    </Router>

);

export default AppRouter;
