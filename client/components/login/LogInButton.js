/**
 * Created by Marjan on 27-Jul-17.
 */
import React, { Component } from 'react';
import auth from '../../auth/initAuth';
import {login, logout} from "../../actions/loginActions";

class LogInButton extends Component {
    _handleClick = (e) => {
        e.preventDefault();
        auth.loginWithFacebook();
    };
    render(){
        return(
            <div className="">
                <span className="btn f-size-1_5" style={{ margin: '0px', padding:'.5em', color:'white'}} onClick={this._handleClick}>
                                Login with Facebook
                </span>
            </div>
        )
    }
}
export default LogInButton;
