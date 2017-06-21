/**
 * Created by Marjan on 21-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions"
import { fetchFoods } from "../../actions/foodActions"


@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

export default class FoodsContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser());
    }

    fetchFoods() {
        this.props.dispatch(fetchFoods());
    }

    render() {
        const {  foods } = this.props;


        if (!foods.length) {
            return <button onClick={this.fetchFoods.bind(this)}>load foods</button>
        }

        const mappedFoods = foods.map(food => <li key={food._id}>{food.name}</li>);

        return <div>
            <button onClick={this.fetchFoods.bind(this)}>load foods</button>
            <ul>{mappedFoods}</ul>
        </div>
    }
}