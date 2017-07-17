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
        const { onDeleteFoodClick, onEditRecipeClick, onEditFoodClick, render, foodType} = this.props;

        let typeLabel = "";
        let action = null;

        if(foodType === "food") {
            typeLabel = "Edit food";
            action = onEditFoodClick;
        } else {
            typeLabel = "Edit recipe";
            action = onEditRecipeClick;
        }


        let showEditFoodActive = "";
        let showDeleteFoodActive = "";

        if (render === "editFood") {
            showEditFoodActive = "active";
            showDeleteFoodActive = "";
        } else if (render === "editRecipe") {
            showEditFoodActive = "active";
            showDeleteFoodActive = "";
        } else {
            showEditFoodActive = "";
            showDeleteFoodActive = "active";
        }


        return (
            <div>
                <div className="container-mob-child px-0">
                    <ul className="nav nav-tabs">
                        <li className="col-xs-6 nav-item" onClick={action}>
                            <a className={"nav-link "  + showEditFoodActive} href="javascript:void(0)">{typeLabel}</a>
                            {/*<NavLink className={"nav-link "  + showEditFoodActive} to={'/foods/edit/' + foodId} >*/}
                                {/*Edit food*/}
                            {/*</NavLink>*/}
                        </li>
                        <li className="col-xs-6 nav-item" onClick={onDeleteFoodClick}>
                            <a className={"nav-link " + showDeleteFoodActive} href="javascript:void(0)">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };
}

export default FoodNavBar;