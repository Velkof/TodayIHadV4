/**
 * Created by Marjan on 19-Jun-17.
 */

import React from "react";
import styles from "./foods.css";

export default class Foods extends React.Component {
    constructor(props){
        super(props);
    }
    sendClickedFoodToParent(value){
        this.props.sendData(value);
        this.props.onFoodDetailsClick();
    }
    render() {
        let mappedFoods;
        if (this.props.foods.length > 0){

        mappedFoods = this.props.foods.map(food =>
            <div className="container-mob-child" key={food._id}
                 onClick={this.sendClickedFoodToParent.bind(this, food)}>
                <div className="foodItem">
                    <div className="col-xs-10 px-0">
                        <span className="f-size-2 c-green">{food.name}</span>

                        <div className="mt-1 mb-0_5">Type: Food | Calories: {food.calories}</div>
                    </div>
                    <div className="col-xs-2">
                        <span className="f-size-2 glyphicon glyphicon-chevron-right" style={{float: "right", lineHeight:"2.5em", color:"darkgrey"}}></span>
                    </div>
                </div>
            </div>);
        } else {
            mappedFoods = <div className="container-mob-child">
                <p className="f-size-2">You haven't added any custom foods or recipes.</p>
            </div>;
        }

        return (
            <div className="main-layout">
                <div className="container-mob" style={{overflow:'hidden'}}>
                    {this.props.foodsNavBar}
                    <ul className="pl-0">{mappedFoods}</ul>
                </div>
            </div>
        )
    }
}