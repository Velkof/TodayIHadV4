/**
 * Created by Marjan on 01-Aug-17.
 */
import React from "react";
import { connect } from "react-redux";
import {
    fetchLoggedInUser, updateUser, fetchFollowedUsers, removeUserByEmail,
    updateAndFetchFollowingUsers
} from "../../actions/userActions";
import {Redirect} from "react-router-dom";
import Friend from "./friend/friend";
import Chat from "./chat/chat";
import AddFriendModal from "../modals/addFriendModal";
import LoadingBars from "../loading/loadingBars";
import Footer from "../footer/footer";
import Header from "../header/header";
import {fetchChatMessagesBetweenUsers, fetchChatMessagesForFollowedUsers} from "../../actions/chatActions";
import FriendProfile from "./friendProfile/friendProfile";


@connect((store) => {
    return {
        userStore: store.users,
        auth: store.auth,
        chatMessages: store.chatMessages.chatMessages,
        followedUsers: store.users.followedUsers,
        loggedInUser: store.users.loggedInUser
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
        if(this.props.followedUsers === null ) {
            this.setState({render:"loading"});
        }
        this.props.dispatch(fetchLoggedInUser(this.props.auth.profile.user_id));
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userStore.loggedInUser === null && nextProps.userStore.loggedInUser) {
            if(nextProps.userStore.loggedInUser.followingUsers.length > 0) {
                this.props.dispatch(fetchFollowedUsers(nextProps.userStore.loggedInUser.followingUsers));
                this.props.dispatch(fetchChatMessagesForFollowedUsers(nextProps.userStore.loggedInUser));
            } else {
                this.setState({render:"friendList"});
            }
        }


        if(this.props.followedUsers === null && nextProps.userStore.followedUsers) {
            this.setState({render:"friendList"});
        }
    }
    clickedUserData(data) {
        this.setState({render:data.action});
        this.clickedUser = data.user;
    }
    backToFriendList() {
        this.setState({render:"friendList"});
    }
    getDataFromAddFriendModal(data){

        if(data === "removeAddedFriend") {
            this.props.dispatch(removeUserByEmail());
        } else {
            let updatedLoggedInUser = Object.assign({}, this.props.userStore.loggedInUser);
            let updatedUserToFollow = Object.assign({}, data);

            updatedLoggedInUser.followingUsers.push(data.user_id);
            updatedUserToFollow.followedByUsers.push(this.props.userStore.loggedInUser.user_id);

            // this.props.dispatch(updateUser(updatedLoggedInUser));
            this.props.dispatch(updateAndFetchFollowingUsers(updatedLoggedInUser));
            this.props.dispatch(updateUser(updatedUserToFollow));

            this.props.dispatch(removeUserByEmail());
        }

    }
    render() {
        const {userStore, auth, followedUsers, chatMessages} = this.props;

        let friends = [];
        let componentsToRender = null;
        let _this = this;
        let unreadMessageCount;
        let unseenMessagesForUserCount;
        let messagesForUser = [];
        let friend;

        if(!auth.isAuthenticated){
            return <Redirect to='/homepage'/>;
        }

        if (followedUsers && chatMessages) {
            if(followedUsers.length > 0) {


                followedUsers.forEach(function (user) {

                    messagesForUser = chatMessages.filter(messagesForCurrentUser);

                    function messagesForCurrentUser(message) {
                        return message.sender === user.user_id || message.receiver === user.user_id;
                    }

                    unseenMessagesForUserCount = messagesForUser.filter(unseenMessagesForCurrentUserCount).length;

                    function unseenMessagesForCurrentUserCount(message) {
                        return message.seen === false && message.receiver === user.user_id;
                    }

                    friend =<Friend
                                key={user._id}
                                user={user}
                                unseenMessagesCount = {unseenMessagesForUserCount}
                                sendData={_this.clickedUserData.bind(_this)}
                            />;

                     friends.push(friend);

                });
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
                                    // chatMessages = {this.props.chatMessages}
                                    chatMessages = {messagesForUser}
            />
        } else if(this.state.render === "loading") {

            componentsToRender = <LoadingBars/>;

        } else if(this.state.render === "friendProfile") {
            componentsToRender = <FriendProfile
                                    friend = {this.clickedUser}
                                    backToFriendList = {this.backToFriendList.bind(this)}
                                    />;
        } else {
            componentsToRender = (<div>
                                    <AddFriendModal
                                        sendData={this.getDataFromAddFriendModal.bind(this)}
                                        addedFriend = {userStore.userByEmail}
                                        dispatch = {this.props.dispatch}
                                        loggedInUser = {userStore.loggedInUser}
                                    />
                                        {friends}
                                  </div>
            );
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

                <Footer
                    backToFriendList = {this.backToFriendList.bind(this)}
                />
            </div>
        )
    }
}