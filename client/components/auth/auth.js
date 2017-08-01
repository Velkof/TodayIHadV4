/**
 * Created by Marjan on 25-Jun-17.
 */

import React, { Component } from 'react';
import LogInButton from "../login/LogInButton";

export default class Auth extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        $('.dropdown-toggle').dropdown();
        $.material.init();
    }
    render() {
        const { onLoginClick, onLogoutClick, isAuthenticated, profile } = this.props;
        return (
            <div >
                { !isAuthenticated ? (
                    <ul className="list-inline" style={{listStyle: "none", lineHeight:"5em"}}>
                        <li className="f-size-2">TodayIHad</li>
                        <li style={{float:"right",}} onClick={onLoginClick}>
                            {/*<span className="btn f-size-1_5" style={{ margin: '0px', padding:'.5em', color:'white'}} onClick={onLoginClick}>*/}
                                {/*Login with Facebook*/}
                            {/*</span>*/}
                            <LogInButton/>
                        </li>
                    </ul>
                ) : (
                    <ul className="list-inline" style={{listStyle: "none", lineHeight:"5em", position:"relative", zIndex:"999"}}>
                        <li className="f-size-2 ">TodayIHad</li>
                        <li className="dropdown" style={{float:"right"}}>
                            <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <img id="avatar" style={{height:"2.5rem"}} src={profile.picture} />
                                <b className="caret c-white"></b>
                                <div className="ripple-container"></div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right" >
                                <li style={{textAlign: "center"}}><a href="javascript:void(0)">Account</a></li>
                                <li style={{textAlign: "center"}}><a href="javascript:void(0)">Help</a></li>
                                <li style={{textAlign: "center"}}><a href="javascript:void(0)">About</a></li>

                                <li className="divider"></li>
                                <li style={{textAlign: "center"}} onClick={onLogoutClick}><a href="javascript:void(0)">Logout</a></li>
                            </ul>
                        </li>
                        <li style={{float:"right"}}>
                            <p>Welcome, {profile.name}</p>
                        </li>
                    </ul>
                )}
            </div>
        )
    }
}