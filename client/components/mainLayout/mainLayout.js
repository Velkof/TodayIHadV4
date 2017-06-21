/**
 * Created by Marjan on 21-Jun-17.
 */
import React, {Component} from 'react';
import {Route} from "react-router-dom";
import DashboardContainer from "../../containers/dashboard/dashboard";
import FoodContainer from "../../containers/food/food";
import FoodsContainer from "../../containers/foods/foods";
import styles from './mainLayout.css';

class MainLayout extends Component {
    render() {
        return (
            <div className="mainLayout container-mob bg-c-white">
                <Route exact path="/" component={DashboardContainer}/>
                <Route exact path="/dashboard" component={DashboardContainer}/>
                <Route exact path="/food" component={FoodContainer}/>
                <Route exact path="api/foods" component={FoodsContainer}/>
            </div>
        );
    };
}

export default MainLayout;