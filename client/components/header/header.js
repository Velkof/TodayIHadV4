/**
 * Created by Marjan on 19-Jun-17.
 */
import React, { Component } from 'react';
import { Link, BrowserRouter } from "react-router-dom";
import {login, logout} from "../../actions/loginActions";
import { connect } from 'react-redux'

import styles from './header.css';
import LogInButton from "../login/LogInButton";

class Header extends Component {

    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    handleLogoutClick() {
        this.props.logout();
    }
    handleClick(event){
        event.stopPropagation();
        let mainComponent = this.props.mainComponent;

        if(mainComponent === "chat" || mainComponent === "friendProfile") {
            this.props.backToFriendList();
        } else if (mainComponent === "editRecipe" || mainComponent === "editFood" || mainComponent === "deleteFood") {
            this.props.backToFoodList();
        } else if (mainComponent === "dashboard") {
            this.props.backToDashboard();
        } else  if (mainComponent === "ingredientSearch") {
            this.props.backToAddRecipe();
        }
    }
    componentDidMount(){
        $('.dropdown-toggle').dropdown();
        $.material.init();
    }
    render() {
        const {  isAuthenticated, profile, mainComponent } = this.props;
        let leftSideOfHeader;

        if( mainComponent === "chat" || mainComponent === "editRecipe" ||
            mainComponent === "editFood" || mainComponent === "deleteFood" ||
            mainComponent === "dashboard" || mainComponent === "ingredientSearch" ||
            mainComponent === "friendProfile") {
            leftSideOfHeader =<div  className="btn btn-default px-1 m-0 f-size-2" onClick={this.handleClick.bind(this)}>
                <span className="glyphicon glyphicon-menu-left c-white" style={{lineHeight:"1.5em", }}></span>
            </div>;
        } else {
            leftSideOfHeader = <li className="f-size-2 ">TodayIHad</li>;
        }

        return (
            <div className="header">
                <div className="container-mob c-white">
                    { !isAuthenticated ? (
                        <ul className="list-inline" style={{listStyle: "none", lineHeight:"5em"}}>
                            <li className="f-size-2">TodayIHad</li>
                            <li style={{float:"right",}}>
                                <LogInButton/>
                            </li>
                        </ul>
                    ) : (
                        <ul className="list-inline" style={{listStyle: "none", lineHeight:"5em", position:"relative", zIndex:"999"}}>
                            {leftSideOfHeader}
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
                                    <li style={{textAlign: "center"}} onClick={this.handleLogoutClick.bind(this)}><a href="javascript:void(0)">Logout</a></li>
                                </ul>
                            </li>
                            <li style={{float:"right"}}>
                                <p>Welcome, {profile.name}</p>
                            </li>
                        </ul>
                    )}

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
