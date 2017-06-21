import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {Route, BrowserRouter } from "react-router-dom";

import store from "./store";

import styles from './assets/stylesheets/main.css';
import colors from './assets/stylesheets/colors.css';


import Test from './components/test/test';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import MainLayout from './components/mainLayout/mainLayout';



const app = document.getElementById('app');


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Header/>
                <MainLayout/>
                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
, app);