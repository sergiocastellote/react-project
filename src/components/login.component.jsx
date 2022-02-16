import React, {Component} from "react";
import LoginService from "../services/login.service";
import SessionStorageService from "../services/sessionStorage.service";

export default class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }


    async login() {
        const res = await LoginService.login()
        if(res){
            SessionStorageService.setToken(res.data.bearer);
            this.props.history.push('/tutorials')
        };
    }

    render() {
        return (
            <div className="submit-form">
                <h4>Login</h4>
                {
                        <div>
                            <button onClick={this.login} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                }
            </div>
        )
    }
}
