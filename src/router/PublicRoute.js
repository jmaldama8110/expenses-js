import React from 'react';
import { Redirect, Route } from 'react-router';

const PublicRoute = ({component: Component, ...rest}) => {
    return(
        <Route
        
            {...rest}
            render={ (props) =>{
                const sessionData = JSON.parse( sessionStorage.getItem("user") );
                return !sessionData ? <Component {...props} />
                                    : <Redirect to={ {pathname :"/home"}} />
            }}
         
        />
    );
}

export { PublicRoute as default };