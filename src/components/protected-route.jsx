import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import auth from '../guards/auth';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                if(auth.isAuthenticated()){
                    return <Component {...props}/>
                } else {
                    alert('No está logado');
                    return <Redirect to={
                        {
                            pathname: '/'
                        }
                    } />
                }
            }
        }/>
    )
}
