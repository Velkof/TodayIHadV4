/**
 * Created by Marjan on 01-Aug-17.
 */
import React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import {fetchUsers} from "../../actions/userActions";
import {Redirect} from "react-router-dom";
import Friend from "./friend/friend";

@connect((store) => {
    return {
        users: store.users.users,
        isAuthenticated: store.auth.isAuthenticated
    };
})

export default class FriendsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showChat: false,
        };
    }
    componentWillMount() {
        this.props.dispatch(fetchUsers());
        $.material.init();
    }
    clickedUser(data) {
        console.log("data", data);
    }
    render() {
        const {users, isAuthenticated} = this.props;
        let friends = [];

        if(!isAuthenticated){
            return <Redirect to='/homepage'/>;
        }

        if (users.length > 0) {
            friends = users.map(user =>
                <Friend
                    key = {user._id}
                    user={user}
                    sendData = {this.clickedUser.bind(this)}
                />
            );
        } else {
            friends = <p>You haven't added any friends</p>;
        }

        return (
            <div className="main-layout">
                <div className="container-mob">
                    {friends}
                </div>
                <Footer/>
            </div>
        )
    }
}