import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import {Route, BrowserRouter } from "react-router-dom";

import store from "./store"

import Test from './components/test/test';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import DashboardContainer from "./containers/dashboard/dashboard";
import FoodContainer from "./containers/food/food";


const app = document.getElementById('app');


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header/>

                <Route exact path="/" component={DashboardContainer}/>
                <Route exact path="/dashboard" component={DashboardContainer}/>
                <Route exact path="/food" component={FoodContainer}/>

                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
, app);