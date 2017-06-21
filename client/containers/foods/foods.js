/**
 * Created by Marjan on 21-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchFoods } from "../../actions/foodActions"
import { fetchUser } from "../../actions/userActions"


@connect((store) => {
    return {
        foods: store.foods.foods,
    };
})

export default class FoodsContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser())
    }

    fetchFoods() {
        this.props.dispatch(fetchFoods());
    }

    render() {
        const { foods } = this.props;

        console.log("foooooooooooooooooooods", foods);

        if (!foods.length) {
            return <button onClick={this.fetchFoods.bind(this)}>load foods</button>
        }

        const mappedFoods = foods.map(food => <li key={food.id}>{food.name}</li>);
        return <div>
            <ul>{mappedFoods}</ul>
        </div>
    }
}