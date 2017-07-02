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
                        <li className="f-size-2_5">TodayIHad</li>
                        <li ><span className="btn btn-raised btn-default" style={{ margin: '0px' }}
                                     onClick={onLoginClick}>Login / Sign up</span></li>
                    </ul>
                ) : (
                    <ul className="list-inline">
                        <li><img src={profile.picture} height="4em" /></li>
                        <li><span>Welcome, {profile.nickname}</span></li>
                        <li><button className="btn btn-secondary btn-raised f-size-1" style={{ margin: '0px' }} onClick={onLogoutClick}>Logout</button></li>
                    </ul>
                )}
            </div>
        )
    }
}