import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import OrdenMision from '../components/OrdenMision';
import Home from '../components/Home';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/ordenmision" component={OrdenMision} exact={true} />
        </Switch>
    </div>

    </Router>

);

export default AppRouter;
