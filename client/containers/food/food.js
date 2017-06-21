/**
 * Created by Marjan on 19-Jun-17.
 */
import React from "react"
import { connect } from "react-redux"

import { fetchUser } from "../../actions/userActions"
import Test from '../../components/test/test';


@connect((store) => {
    return {
        user: store.user.user,
        userFetched: store.user.fetched,
    };
})

export default class FoodContainer extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchUser())
    }


    render() {
        const { user } = this.props;
        return(
            <div>
                <h1>{user.name}</h1>
                <Test/>
            </div>
        );
    }
}