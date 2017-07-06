/**
 * Created by Marjan on 23-Jun-17.
 */
import React, {Component} from 'react';
import { connect } from "react-redux"

import { fetchFoods } from "../../../actions/foodActions";
import Footer from "../../footer/footer";

@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

class ViewFood extends Component {
    componentWillMount(){
        this.props.dispatch(fetchFoods());

        let id = window.location.href.substr(window.location.href.length - 24);

        this.currentFood = this.props.foods.filter(function(food){
            return food._id === id;
        });

        this.currentFood = this.currentFood[0];
    }
    render() {
        return (
            <div className="main-layout">
                <div className="container-mob bg-c-white" style={{overflow:'hidden'}}>
                    <h1>Food</h1>
                    <div className="form-group label-floating">
                        <label className="control-label">Name</label>
                        <p> {this.currentFood.name}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Amount</label>
                        <p> {this.currentFood.amount}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Unit</label>
                        <p> {this.currentFood.unit}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Calories</label>
                        <p> {this.currentFood.calories}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Protein (g)</label>
                        <p> {this.currentFood.protein}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Fat (g)</label>
                        <p> {this.currentFood.fat}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Carbs (g)</label>
                        <p> {this.currentFood.carbs}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Sat. Fat (g)</label>
                        <p> {this.currentFood.fatSat}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Fiber (g)</label>
                        <p> {this.currentFood.fiber}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Mono. Fat (g)</label>
                        <p> {this.currentFood.fatMono}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Sugar (g)</label>
                        <p> {this.currentFood.sugar}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Poly. Fat (g)</label>
                        <p> {this.currentFood.fatPoly}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Sodium (mg)</label>
                        <p> {this.currentFood.sodium}</p>
                    </div>
                    <div className="col-xs-6 form-group label-floating px-0">
                        <label className="control-label">Cholesterol (mg)</label>
                        <p> {this.currentFood.cholesterol}</p>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    };
}

export default ViewFood;