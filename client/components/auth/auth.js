/**
 * Created by Marjan on 25-Jun-17.
 */
// components/Auth.js

import React, { Component, PropTypes } from 'react';

export default class Auth extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { onLoginClick, onLogoutClick, isAuthenticated, profile } = this.props
        return (
            <div >
                { !isAuthenticated ? (
                    <ul className="list-inline">
                        <li ><button className="btn btn-secondary btn-raised" style={{ margin: '0px' }}
                                     onClick={onLoginClick}>Login</button></li>
                    </ul>
                ) : (
                    <ul className="list-inline">
                        <li><img src={profile.picture} height="40px" /></li>
                        <li><span>Welcome, {profile.nickname}</span></li>
                        <li><button className="btn btn-secondary btn-raised" style={{ margin: '0px' }} onClick={onLogoutClick}>Logout</button></li>
                    </ul>
                )}
            </div>
        )
    }
}