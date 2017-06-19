/**
 * Created by Marjan on 18-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"
import { fetchTweets } from "../actions/tweetsActions"


@connect((store) => {
    return {
        user: store.user.user,
        userFetched: store.user.fetched,
        tweets: store.tweets.tweets,
    };
})

export default class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser())
    }

    fetchTweets() {
        this.props.dispatch(fetchTweets());
    }

    render() {
        const { user, tweets } = this.props;

        if (!tweets.length) {
            return <button onClick={this.fetchTweets.bind(this)}>load tweets</button>
        }


        const mappedTweets = tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>)
        console.log(mappedTweets, "mappedTweets");
        return <div>
            {/*<h1>{user}</h1>*/}
            <ul>{mappedTweets}</ul>
        </div>
    }
}