/**
 * Created by Marjan on 23-Jun-17.
 */
import React, {Component} from 'react';

import {deleteFood } from "../../../actions/foodActions";
import Footer from "../../footer/footer";
import {Link} from "react-router-dom";

class DeleteFood extends Component {
    componentWillMount(){
        console.log("this props", this.props);


    }
    deleteFood() {
        this.props.dispatch(deleteFood(this.props.food._id));
    }
    render() {
        return (
            <div className="main-layout">
                <div className="container-mob">
                    {this.props.foodNavBar}

                    <div className="c-grey mt-1 f-size-1_5 pl-0_5">
                        <p>DELETE FOOD</p>
                    </div>
                    <div className="container-mob-child">
                        <p className="f-size-2"> Are you sure you want to delete "{this.props.food.name}"?</p>
                    </div>
                    <Link className="c-white" to={'/foods'}>
                        <button className="col-xs-12 btn btn-raised btn-danger my-1 f-size-2" onClick={this.deleteFood.bind(this)}> Delete Food </button>
                    </Link>
                </div>

                <Footer/>
            </div>
        );
    };
}

export default DeleteFood;