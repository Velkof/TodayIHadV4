/**
 * Created by Marjan on 23-Jun-17.
 */
import React, {Component} from 'react';

import {deleteFood } from "../../../actions/foodActions";
import Footer from "../../footer/footer";

class DeleteFood extends Component {
    deleteFood() {
        this.props.dispatch(deleteFood(this.props.food._id));
    }
    render() {
        return (
            <div className="main-layout">
                <div className="container-mob"  style={{overflow:'hidden'}}>
                    {this.props.backToFoodsNav}

                    <div className="c-grey f-size-2 pl-0_5" style={{textAlign:"center"}}>
                        <span>{this.props.food.name}</span>
                    </div>

                    {this.props.foodNavBar}

                    <div className="container-mob-child">
                        <p className="f-size-2"> Are you sure you want to delete "{this.props.food.name}"?</p>
                    </div>
                    <div onClick={this.props.onShowFoodsClick}>
                        <button className="col-xs-12 btn btn-raised btn-danger my-1 f-size-2" onClick={this.deleteFood.bind(this)}> Delete Food </button>
                    </div>
                </div>
            </div>
        );
    };
}

export default DeleteFood;