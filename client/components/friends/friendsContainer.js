/**
 * Created by Marjan on 01-Aug-17.
 */
import React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import {fetchAllUsersExceptLoggedIn, fetchUsers, fetchLoggedInUser, updateUser } from "../../actions/userActions";
import {Redirect} from "react-router-dom";
import Friend from "./friend/friend";
import Chat from "./chat/chat";
import AddFriendModal from "../modals/addFriendModal";
import AddUnitModal from "../modals/addUnitModal";


@connect((store) => {
    return {
        userStore: store.users,
        auth: store.auth,
        chatMessages: store.chatMessages.chatMessages,
    };
})

export default class FriendsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            render: "friendList",
        };
        this.clickedUser = {};
        this.friends = [];
    }
    componentWillMount() {
        $.material.init();
        this.props.dispatch(fetchAllUsersExceptLoggedIn(this.props.auth.profile.user_id));
        this.props.dispatch(fetchLoggedInUser(this.props.auth.profile.user_id));
    }
    shouldComponentUpdate(nextProps){
        this.props = nextProps;
        return true;
    }
    clickedUserData(data) {
        this.setState({render:data.action});
        this.clickedUser = data.user;
    }
    backToFriendList() {
        this.setState({render:"friendList"});
    }
    getDataFromAddFriendModal(userToFollow){

        console.log("user to follow", userToFollow);

        let updatedLoggedInUser = Object.assign({}, this.props.userStore.loggedInUser);
        let updatedUserToFollow = Object.assign({}, userToFollow);

        console.log("updatedLoggedInUser 1", updatedLoggedInUser);
        console.log("updatedUserToFollow 1", updatedUserToFollow);

        updatedLoggedInUser.followingUsers.push(userToFollow.user_id);
        updatedUserToFollow.followedByUsers.push(this.props.userStore.loggedInUser.user_id);

        console.log("updatedLoggedInUser 2", updatedLoggedInUser);
        console.log("updatedUserToFollow 2", updatedUserToFollow);

        this.props.dispatch(updateUser(updatedLoggedInUser));
        this.props.dispatch(updateUser(updatedUserToFollow))
    }

    render() {
        const {userStore, auth, bbb} = this.props;
        let friends = [];

        let componentsToRender = null;

        if(!auth.isAuthenticated){
            return <Redirect to='/homepage'/>;
        }
        friends = userStore.users.map(user =>
            <Friend
                key = {user._id}
                user={user}
                sendData = {this.clickedUserData.bind(this)}
            />
        );

        if (userStore.fetched === true) {
            if(userStore.users.length > 0) {
                friends = userStore.users.map(user =>
                    <Friend
                        key={user._id}
                        user={user}
                        sendData={this.clickedUserData.bind(this)}
                    />
                );
            } else {
                friends = <p>You haven't added any friends</p>;
            }
        }

        if (this.state.render === "chat") {
            componentsToRender = <Chat
                                    friend = {this.clickedUser}
                                    dispatch = {this.props.dispatch}
                                    backToFriendList = {this.backToFriendList.bind(this)}
                                    user_id = {auth.profile.user_id}
                                    chatMessages = {this.props.chatMessages}
            />
        } else {
            componentsToRender = friends;
        }


        return (
            <div className="main-layout">
                <Header
                    mainComponent = {this.state.render}
                    backToFriendList = {this.backToFriendList.bind(this)}
                />

                <div className="container-mob">
                    {componentsToRender}
                </div>

                <AddFriendModal
                    sendData={this.getDataFromAddFriendModal.bind(this)}
                    addedFriend = {userStore.userByEmail}
                    dispatch = {this.props.dispatch}
                />

                <Footer
                    backToFriendList = {this.backToFriendList.bind(this)}
                />
            </div>
        )
    }
}