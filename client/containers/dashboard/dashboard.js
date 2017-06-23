/**
 * Created by Marjan on 19-Jun-17.
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

export default class DashboardContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser())
    }

    fetchFoods() {
        this.props.dispatch(fetchFoods());
    }

    render() {
        return <div>
            <h1>DASHBOARD</h1>
        </div>
    }
}