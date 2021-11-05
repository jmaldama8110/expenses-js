import React from "react";
import { Redirect,Route } from "react-router";


const PrivateRoute = ({component: Component, ...rest})=> {
    return (
        <Route
            {...rest}
            render={ props =>{
                const sessionData = JSON.parse( sessionStorage.getItem("usuario") );
                return sessionData  ? <Component {...props} />
                                    : <Redirect to={ {pathname : "/" }} />

            }}
        />
    );
}

export { PrivateRoute as default };