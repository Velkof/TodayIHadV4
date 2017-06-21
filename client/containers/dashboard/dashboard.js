/**
 * Created by Marjan on 19-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions"
import { fetchTweets } from "../../actions/tweetsActions"
import { fetchFoods } from "../../actions/foodActions"


@connect((store) => {
    return {
        tweets: store.tweets.tweets,
    };
})

export default class DashboardContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser())
    }

    fetchTweets() {
        this.props.dispatch(fetchTweets());
    }
    fetchFoods() {
        this.props.dispatch(fetchFoods());
    }

    render() {
        const { tweets, foods } = this.props;

        if (!tweets.length) {
            return <button onClick={this.fetchTweets.bind(this)}>load tweets</button>
        }

        if (!foods.length) {
            return <button onClick={this.fetchFoods.bind(this)}>load foods</button>
        }

        const mappedTweets = tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>);
        const mappedFoods = foods.map(food => <li key={food.id}>{food.name}</li>);

        return <div>
            <ul>{mappedTweets}</ul>
            <ul>{mappedFoods}</ul>
        </div>
    }
}