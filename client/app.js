import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {Route, BrowserRouter } from "react-router-dom";

import store from "./store";

import styles from './assets/stylesheets/main.css';


import Test from './components/test/test';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import DashboardContainer from "./containers/dashboard/dashboard";
import FoodContainer from "./containers/food/food";
import FoodsContainer from "./containers/foods/foods";


const app = document.getElementById('app');


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header/>
                <Route exact path="/" component={DashboardContainer}/>
                <Route exact path="/dashboard" component={DashboardContainer}/>
                <Route exact path="/food" component={FoodContainer}/>
                <Route exact path="api/foods" component={FoodsContainer}/>
                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
, app);