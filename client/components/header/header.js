/**
 * Created by Marjan on 19-Jun-17.
 */
import React, { Component } from 'react';
import { Link, BrowserRouter } from "react-router-dom";

import styles from './header.css';
import UserService from '../../services/userService';

class Header extends Component {

    constructor(props) {
        super(props);
        this.userService = new UserService();
    }

    componentWillMount() {
        this.userService.getUserProfile().then(result => console.log(result));
    }

    render() {
        return (
            <div className="header">
                <div className="container-mob c-white">
                    <p>Header</p>
                </div>
            </div>
        );
    }
}

export default Header;