/**
 * Created by Marjan on 19-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions"
import { fetchTweets } from "../../actions/tweetsActions"


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

    render() {
        const { tweets } = this.props;

        if (!tweets.length) {
            return <button onClick={this.fetchTweets.bind(this)}>load tweets</button>
        }

        const mappedTweets = tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>)
        return <div>
            <ul>{mappedTweets}</ul>
        </div>
    }
}