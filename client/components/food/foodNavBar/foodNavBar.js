/**
 * Created by Marjan on 08-Jul-17.
 */
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class FoodNavBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { onShowFoodsClick, onDeleteFoodClick, onFoodDetailsClick, onEditFoodClick, render, foodId} = this.props;

        let showEditFoodActive = "";
        let showDeleteFoodActive = "";
        let showFoodDetailsActive = "";

        if (render === "editFood") {
            showEditFoodActive = "active";
            showDeleteFoodActive = "";
            showFoodDetailsActive = "";

        } else if (render === "foodDetails"){
            showEditFoodActive = "";
            showDeleteFoodActive = "";
            showFoodDetailsActive = "active";
        }
        else {
            showEditFoodActive = "";
            showDeleteFoodActive = "active";
            showFoodDetailsActive = "";
        }

        return (
            <div>
                <div className="container-mob-child px-0">
                    <ul className="nav nav-tabs">
                        <li className="col-xs-4 nav-item" onClick={onFoodDetailsClick}>
                            <a className={"nav-link " + showFoodDetailsActive} href="javascript:void(0)"> Food details </a>
                        </li>
                        <li className="col-xs-4 nav-item" onClick={onEditFoodClick}>
                            <a className={"nav-link "  + showEditFoodActive} href="javascript:void(0)">Edit</a>
                            {/*<NavLink className={"nav-link "  + showEditFoodActive} to={'/foods/edit/' + foodId} >*/}
                                {/*Edit food*/}
                            {/*</NavLink>*/}
                        </li>
                        <li className="col-xs-4 nav-item" onClick={onDeleteFoodClick}>
                            <a className={"nav-link " + showDeleteFoodActive} href="javascript:void(0)">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };
}

export default FoodNavBar;