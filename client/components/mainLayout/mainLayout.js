/**
 * Created by Marjan on 21-Jun-17.
 */
import React, {Component} from 'react';
import {Route} from "react-router-dom";
import DashboardContainer from "../../containers/dashboard/dashboard";
import FoodsContainer from "../../containers/foods/foods";
import EditFood from "../food/editFood/editFood";
import ViewFood from "../food/viewFood/viewFood";
import AddFood from "../food/addFood/addFood";
import DeleteFood from "../food/deleteFood/deleteFood";

import styles from './mainLayout.css';

class MainLayout extends Component {
    render() {
        return (
            <div className="mainLayout container-mob bg-c-white">
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

export default MainLayout;