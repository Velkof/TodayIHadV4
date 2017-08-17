import React from 'react';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import history from './history';
import store from "./store";

import {Provider} from "react-redux";
import DashboardContainer from "./components/dashboard/dashboardContainer";
import Foods from "./components/food/foods/foods";
import EditFood from "./components/food/editFood/editFood";
import AddFood from "./components/food/addFood/addFood";
import DeleteFood from "./components/food/deleteFood/deleteFood";
import HomepageContainer from "./components/homepage/homepageContainer";
import FoodsContainer from "./components/food/foodsContainer";
import Callback from "./components/callback/callback";
import { isTokenExpired } from './auth/jwtHelper';
import FriendsContainer from "./components/friends/friendsContainer";
import AuthService from "./auth/AuthService";
import StatsContainer from "./components/stats/statsContainer";
import NotificationsContainer from "./components/notifications/notifications";



function requireAuth() {
    let jwt = localStorage.getItem('id_token');
    if(jwt && isTokenExpired(jwt) === false) {
        return true;
    }
    return false;
}


export const Routes = () => {
    return (
    <Provider history={history} store={store}>
        <BrowserRouter>
            <div>
                <Route exact path="/homepage"  render={() => ( requireAuth() ? ( <Redirect to="/"/>) : ( <HomepageContainer />) )}/>
                <Route exact path="/"  render={() => ( requireAuth() ? ( <DashboardContainer />) : ( <Redirect to="/homepage"/>) )}/>
                <Route exact path="/dashboard"  render={() => ( requireAuth() ? ( <DashboardContainer />) : ( <Redirect to="/homepage"/>) )}/>
                <Route exact path="/friends"  render={() => ( requireAuth() ? ( <FriendsContainer/>) : ( <Redirect to="/homepage"/>) )}/>
                <Route exact path="/foods"  render={() => ( requireAuth() ? ( <FoodsContainer/>) : ( <Redirect to="/homepage"/>) )}/>
                <Route exact path="/stats"  render={() => ( requireAuth() ? ( <StatsContainer/>) : ( <Redirect to="/homepage"/>) )}/>
                <Route exact path="/notifications"  render={() => ( requireAuth() ? ( <NotificationsContainer/>) : ( <Redirect to="/homepage"/>) )}/>
                <Route path="/callback"  render={() => ( requireAuth() ? ( <Redirect to="/"/>) : ( <Callback />) )}/>
            </div>
        </BrowserRouter>
    </Provider>
    );
};