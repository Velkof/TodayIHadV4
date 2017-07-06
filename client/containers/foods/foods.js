/**
 * Created by Marjan on 19-Jun-17.
 */

import React from "react";
import { connect } from "react-redux";

import { fetchFoods } from "../../actions/foodActions";
import {Link, Route} from "react-router-dom";
import Footer from "../../components/footer/footer";


@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

export default class Foods extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchFoods());
    }
    render() {
        const { foods } = this.props;

        const mappedFoods = foods.map(food =>
            <div key={food._id}>
                {food.name}
                <Link to={'foods/edit/'+ food._id}>    Edit food     </Link>
                <Link to={'foods/view/'+ food._id}>    View food     </Link>
                <Link to={'foods/delete/'+ food._id}>  Delete food   </Link>
            </div>);



        return (
            <div className="main-layout">
                <div className="container-mob bg-c-white" style={{overflow:'hidden'}}>
                    <h1>FOODS</h1>
                    <Link to={'/foods/add'} >Add Food</Link> <br/><br/>
                    <ul>{mappedFoods}</ul>
                </div>
                <Footer/>
            </div>
        )
    }
}