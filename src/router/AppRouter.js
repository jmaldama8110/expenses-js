import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import OrdenMisionAdd from '../components/OrdenMisionAdd';

import Home from '../components/Home';
import ConfiguracionHome from '../components/catalogs/ConfiguracionHome';

import { createBrowserHistory } from "history";
import OrdenMisionEdit from '../components/OrdenMisionEdit';


export const history =  createBrowserHistory(); 


const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/add" component={OrdenMisionAdd} exact={true} />
            <Route path="/edit" component={OrdenMisionEdit} exact={true} />
            <Route path="/config" component={ConfiguracionHome} exact={true} />
            
        </Switch>
    </div>

    </Router>

);

export default AppRouter;
