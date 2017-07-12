/**
 * Created by Marjan on 23-Jun-17.
 */
import React, {Component} from 'react';
import Footer from "../../footer/footer";


class FoodDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="main-layout">
                <div className="container-mob mb-1" style={{overflow:'hidden'}}>
                    {this.props.backToFoodsNav}

                    <div className="c-grey f-size-2 pl-0_5" style={{textAlign:"center"}}>
                        <span>{this.props.food.name}</span>
                    </div>

                    {this.props.foodNavBar}

                    <div className="container-mob-child">
                        <div className="form-group label-floating">
                            <label className="control-label">Name</label>
                            <p> {this.props.food.name}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Amount</label>
                            <p> {this.props.food.amount}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Unit</label>
                            <p> {this.props.food.unit}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Calories</label>
                            <p> {this.props.food.calories}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Protein (g)</label>
                            <p> {this.props.food.protein}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Fat (g)</label>
                            <p> {this.props.food.fat}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Carbs (g)</label>
                            <p> {this.props.food.carbs}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Sat. Fat (g)</label>
                            <p> {this.props.food.fatSat}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Fiber (g)</label>
                            <p> {this.props.food.fiber}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Mono. Fat (g)</label>
                            <p> {this.props.food.fatMono}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Sugar (g)</label>
                            <p> {this.props.food.sugar}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Poly. Fat (g)</label>
                            <p> {this.props.food.fatPoly}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Sodium (mg)</label>
                            <p> {this.props.food.sodium}</p>
                        </div>
                        <div className="col-xs-6 form-group label-floating px-0">
                            <label className="control-label">Cholesterol (mg)</label>
                            <p> {this.props.food.cholesterol}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default FoodDetails;