/**
 * Created by Marjan on 19-Jun-17.
 */

import React from "react";
import {Link} from "react-router-dom";

export default class Foods extends React.Component {
    constructor(props){
        super(props);
        console.log("foods props", this.props)
    }
    sendFoodToDeleteToParent(value){
        this.props.sendData(value);
        this.props.onDeleteFoodClick();
    }
    sendFoodToEditToParent(value){
        this.props.sendData(value);
        this.props.onEditFoodClick();
    }
    render() {
        const {  onEditFoodClick, onDeleteFoodClick } = this.props;

        const mappedFoods = this.props.foods.map(food =>
            <div className="container-mob-child" key={food._id}>
                {food.name}
                <button onClick={this.sendFoodToEditToParent.bind(this, food)}>Edit</button>
                <button onClick={this.sendFoodToDeleteToParent.bind(this, food)}>Delete</button>
            </div>);

        return (
            <div className="main-layout">
                <div className="container-mob" style={{overflow:'hidden'}}>
                    {this.props.foodsNavBar}
                    <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                        <p>MY FOODS AND RECIPES</p>
                    </div>
                    <ul className="pl-0">{mappedFoods}</ul>
                </div>
            </div>
        )
    }
}