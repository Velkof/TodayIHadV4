/**
 * Created by Marjan on 19-Jun-17.
 */
import React, { Component } from 'react';
import { Link, BrowserRouter } from "react-router-dom";
import Auth from "../auth/auth";
import {login, logout} from "../../actions/loginActions";
import { connect } from 'react-redux'

import styles from './header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    handleLoginClick() {
        this.props.login()
    }

    handleLogoutClick() {
        this.props.logout()
    }
    render() {
        const {  isAuthenticated, profile } = this.props

        return (
            <div className="header">
                <div className="container-mob c-white">
                    <Auth
                        isAuthenticated={isAuthenticated}
                        profile={profile}
                        onLoginClick={this.handleLoginClick}
                        onLogoutClick={this.handleLogoutClick}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    const { isAuthenticated, profile } = auth;
    return {
        isAuthenticated,
        profile
    }
}

export default connect(mapStateToProps, {
    login,
    logout
})(Header)

// export default Header;