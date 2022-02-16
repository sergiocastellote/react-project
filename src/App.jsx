import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, Route, Router, Switch} from "react-router-dom";
import AddTutorial from "./components/add-tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import Tutorial from "./components/tutorial.component";
import LoginComponent from "./components/login.component";
import {ProtectedRoute} from "./components/protected-route";
import Nav from "./components/nav.component";

export function App(){
        return (
                    <div>
                            <Nav></Nav>
                            <div className="container mt-3">
                                    <Switch>
                                        <Route exact path="/" component={LoginComponent} />
                                        <ProtectedRoute exact path={["/tutorials"]} component={TutorialsList} />
                                        <ProtectedRoute exact path="/add" component={AddTutorial} />
                                        <ProtectedRoute path="/tutorials/:id" component={Tutorial} />
                                    </Switch>
                            </div>
                    </div>
        )
}
