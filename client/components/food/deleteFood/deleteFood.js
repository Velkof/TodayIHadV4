/**
 * Created by Marjan on 23-Jun-17.
 */
import React, {Component} from 'react';
import { connect } from "react-redux"

import {deleteFood, fetchFoods } from "../../../actions/foodActions";
import Footer from "../../footer/footer";
import {Link} from "react-router-dom";

@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

class DeleteFood extends Component {
    componentWillMount(){
        this.props.dispatch(fetchFoods());

        let id = window.location.href.substr(window.location.href.length - 24);

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
            <div className="main-layout">
                <div className="container-mob bg-c-white" style={{overflow:'hidden'}}>
                    <h1>Delete Food</h1>
                    <p> Are you sure you want to delete "{this.currentFood.name}"?</p>
                    <button className="col-xs-12 btn btn-raised btn-primary" onClick={this.deleteFood.bind(this)}><Link className="c-white" to={'/foods'}>Delete Food</Link> </button>

                </div>
                <Footer/>
            </div>
        );
    };
}

export default DeleteFood;