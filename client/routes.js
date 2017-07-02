import React from 'react';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import history from './history';
import store from "./store";


import Header from './components/header/header';
import {Provider} from "react-redux";
import Dashboard from "./containers/dashboard/dashboard";
import FoodsContainer from "./containers/foods/foods";
import EditFood from "./components/food/editFood/editFood";
import ViewFood from "./components/food/viewFood/viewFood";
import AddFood from "./components/food/addFood/addFood";
import DeleteFood from "./components/food/deleteFood/deleteFood";
import Homepage from "./containers/homepage/homepage";



function requireAuth() {
    let jwt = localStorage.getItem('id_token');
    if(jwt) {
        return true;
    }
    return false;
}


export const Routes = () => {
    return (
    <Provider history={history} store={store}>
        <BrowserRouter>
            <div>
                <Header/>
                <Route exact path="/homepage"  render={() => ( requireAuth() ? ( <Redirect to="/"/>) : ( <Homepage />) )}/>
                <Route exact path="/"  render={() => ( requireAuth() ? ( <Dashboard />) : ( <Redirect to="/homepage"/>) )}/>
                <Route exact path="/dashboard"  render={() => ( requireAuth() ? ( <Dashboard />) : ( <Redirect to="/homepage"/>) )}/>
                <Route exact path="/foods"  render={() => ( requireAuth() ? ( <FoodsContainer />) : ( <Redirect to="/homepage"/>) )}/>
                <Route exact path="/foods/edit/:id" component={EditFood}/>
                <Route exact path="/foods/delete/:id" component={DeleteFood}/>
                <Route exact path="/foods/view/:id" component={ViewFood}/>
                <Route exact path="/foods/add" component={AddFood}/>
            </div>
        </BrowserRouter>
    </Provider>
    );
};