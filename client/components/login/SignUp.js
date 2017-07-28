/**
 * Created by Marjan on 27-Jul-17.
 */
import React, { Component } from 'react'
import auth from '../../auth/initAuth'
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null
        }
    }

    _handleSubmit = (e, data) => {
        e.preventDefault();
        auth.signup(this.state.email, this.state.password)
    };
    _handleEmailChange = (e) => {
        this.setState( {email: e.target.value} );
        console.log('email', this.state.email)
    };
    _handlePasswordChange = (e) => {
        this.setState( {password: e.target.value} );
        console.log('password', this.state.password)
    };
    _handleClick = (e) => {
        e.preventDefault();
        auth.loginWithFacebook();
    };
    render(){
        return(
            <div className="" style={{marginTop:"10em"}}>
            {/*<form className="commentForm" onSubmit={this._handleSubmit}>*/}
                {/*<input type="email" placeholder="Enter your email" onChange={this._handleEmailChange}/>*/}
                {/*<input type="password" placeholder="Enter a password" onChange={this._handlePasswordChange}/>*/}
                {/*<input type="submit" value="Sign up" />*/}
            {/*</form>*/}
                <input type="button" className="popup-login-facebook" value="Facebook" onClick={this._handleClick}/>

            </div>
        )
    }
}
export default SignUp;
