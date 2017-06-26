/**
 * Created by Marjan on 21-Jun-17.
 */
import React, {Component} from 'react';
import {Route} from "react-router-dom";
import { connect } from 'react-redux'
import {login, logout} from "../../actions/loginActions";


import DashboardContainer from "../../containers/dashboard/dashboard";
import FoodsContainer from "../../containers/foods/foods";
import EditFood from "../food/editFood/editFood";
import ViewFood from "../food/viewFood/viewFood";
import AddFood from "../food/addFood/addFood";
import Auth from "../auth/auth";
import DeleteFood from "../food/deleteFood/deleteFood";

import styles from './mainLayout.css';


class MainLayout extends Component {
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
        const {  isAuthenticated, profile } = this.props;

        return (

        <div className="mainLayout container-mob bg-c-white">
            <div className="navbar navbar-default">
                <div className="container-fluid">
                    <a className="navbar-brand">Redux Jedi</a>
                    <Auth
                        isAuthenticated={isAuthenticated}
                        profile={profile}
                        onLoginClick={this.handleLoginClick}
                        onLogoutClick={this.handleLogoutClick}
                    />
                </div>
            </div>
                <Route exact path="/" component={DashboardContainer}/>
                <Route exact path="/dashboard" component={DashboardContainer}/>
                <Route exact path="/foods" component={FoodsContainer}/>
                <Route exact path="/api/foods/edit/:id" component={EditFood}/>
                <Route exact path="/api/foods/delete/:id" component={DeleteFood}/>
                <Route exact path="/api/foods/view/:id" component={ViewFood}/>
                <Route exact path="/api/foods/add" component={AddFood}/>
            </div>
        );
    };
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
})(MainLayout)


// export default MainLayout;