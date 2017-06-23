/**
 * Created by Marjan on 23-Jun-17.
 */
import React, {Component} from 'react';
import { connect } from "react-redux"

import { fetchFoods } from "../../../actions/foodActions";

@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

class ViewFood extends Component {
    componentWillMount(){
        this.props.dispatch(fetchFoods());

        let id = this.props.match.params.id;

        this.currentFood = this.props.foods.filter(function(food){
            return food._id === id;
        });

        this.currentFood = this.currentFood[0];
    }
    render() {
        return (
            <div className="">
                <h1>View Food</h1>
                <label>Food Name</label>
                <p> {this.currentFood.name}</p>
            </div>
        );
    };
}

export default ViewFood;