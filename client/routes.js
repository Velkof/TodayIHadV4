import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import history from './history';
import store from "./store";


import Header from './components/header/header';
import Footer from './components/footer/footer';
import {Provider} from "react-redux";
import DashboardContainer from "./containers/dashboard/dashboard";
import FoodsContainer from "./containers/foods/foods";
import EditFood from "./components/food/editFood/editFood";
import ViewFood from "./components/food/viewFood/viewFood";
import AddFood from "./components/food/addFood/addFood";
import DeleteFood from "./components/food/deleteFood/deleteFood";


export const makeMainRoutes = () => {
    return (
    <Provider history={history} store={store}>
        <BrowserRouter>
            <div>
                <Header/>
                <Route exact path="/" component={DashboardContainer}/>
                <Route exact path="/dashboard" component={DashboardContainer}/>
                <Route exact path="/foods" component={FoodsContainer}/>
                <Route exact path="/foods/edit/:id" component={EditFood}/>
                <Route exact path="/foods/delete/:id" component={DeleteFood}/>
                <Route exact path="/foods/view/:id" component={ViewFood}/>
                <Route exact path="/foods/add" component={AddFood}/>
                <Footer/>
            </div>
        </BrowserRouter>
    </Provider>
    );
};