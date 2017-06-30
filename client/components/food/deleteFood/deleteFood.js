/**
 * Created by Marjan on 23-Jun-17.
 */
import React, {Component} from 'react';
import { connect } from "react-redux"

import {deleteFood, fetchFoods } from "../../../actions/foodActions";
import Footer from "../../footer/footer";

@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

class DeleteFood extends Component {
    componentWillMount(){
        this.props.dispatch(fetchFoods());

        let id = this.props.match.params.id;

        this.setState({id: id});

        this.currentFood = this.props.foods.filter(function(food){
            return food._id === id;
        });

        this.currentFood = this.currentFood[0];
    }
    deleteFood() {
        this.props.dispatch(deleteFood(this.state));
    }
    render() {
        return (
            <div>
                <div className="container-mob bg-c-white main-layout">
                    <h1>Delete Food</h1>
                    <p> Are you sure you want to delete {this.currentFood.name}?</p>
                    <button onClick={this.deleteFood.bind(this)}>Delete</button>
                </div>
                <Footer/>
            </div>
        );
    };
}

export default DeleteFood;