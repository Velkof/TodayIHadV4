/**
 * Created by Marjan on 01-Aug-17.
 */
import React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import {fetchUsers} from "../../actions/userActions";
import {Redirect} from "react-router-dom";
import Friend from "./friend/friend";
import Chat from "./chat/chat";

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
            render: "friendList",
        };

        this.clickedUser = {};
    }
    componentWillMount() {
        this.props.dispatch(fetchUsers());
        $.material.init();
    }
    clickedUserData(data) {
        console.log("data",data);

        this.setState({render:data.action});
        this.clickedUser = data.user;
    }
    backToFriendList () {
        this.setState({render:"friendList"});
    }
    render() {
        const {users, isAuthenticated} = this.props;
        let friends = [];


        let componentsToRender = null;


        if(!isAuthenticated){
            return <Redirect to='/homepage'/>;
        }

        if (users.length > 0) {
            friends = users.map(user =>
                <Friend
                    key = {user._id}
                    user={user}
                    sendData = {this.clickedUserData.bind(this)}
                />
            );
        } else {
            friends = <p>You haven't added any friends</p>;
        }

        if (this.state.render === "chat") {
            componentsToRender = <Chat
                                    friend = {this.clickedUser}
                                    dispatch = {this.props.dispatch}
                                    backToFriendList = {this.backToFriendList.bind(this)}
            />
        } else {
            componentsToRender = friends;
        }

        return (
            <div className="main-layout">
                <div className="container-mob">
                    {componentsToRender}
                </div>
                <Footer/>
            </div>
        )
    }
}