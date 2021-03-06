/**
 * Created by Marjan on 23-Jun-17.
 */
import React, {Component} from 'react';

import {deleteFood } from "../../../actions/foodActions";

class DeleteFood extends Component {
    deleteFood() {
        this.props.dispatch(deleteFood(this.props.food._id));
    }
    render() {
        return (
            <div className="main-layout">
                <div className="container-mob"  style={{overflow:'hidden'}}>

                    {this.props.foodNavBar}

                    <div className="container-mob-child">
                        <p className="f-size-2"> Are you sure you want to delete "{this.props.food.name}"?</p>
                    </div>
                    <div onClick={this.props.onShowFoodsClick}>
                        <button className="col-xs-12 btn c-white bg-c-red-danger my-1 f-size-2" onClick={this.deleteFood.bind(this)}> Delete </button>
                    </div>
                </div>
            </div>
        );
    };
}

export default DeleteFood;