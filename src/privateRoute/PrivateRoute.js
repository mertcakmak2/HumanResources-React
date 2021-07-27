import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
    
    const isAuthenticate = useSelector(state => state.isAuthenticate)

    return (
        <Route {...rest}
            render={({ location }) =>
                isAuthenticate 
                ? ( children) 
                : ( <Redirect to={ {pathname: "/login", state: { from: location } }} /> )
            }
        />
    );
}