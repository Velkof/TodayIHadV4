/**
 * Created by Marjan on 01-Aug-17.
 */
import React from "react";
import { connect } from "react-redux";
import Footer from "../footer/footer";
import Header from "../header/header";
import {
    fetchAllUsersExceptLoggedIn, fetchUsers, fetchLoggedInUser, updateUser,
    fetchFollowedUsers
} from "../../actions/userActions";
import {Redirect} from "react-router-dom";
import Friend from "./friend/friend";
import Chat from "./chat/chat";
import AddFriendModal from "../modals/addFriendModal";
import AddUnitModal from "../modals/addUnitModal";
import LoadingSwirl from "../loading/loadingSwirl";



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
            render: "loading",
        };

        this.clickedUser = {};
        this.friends = [];
    }
    componentWillMount() {
        // this.props.dispatch(fetchAllUsersExceptLoggedIn(this.props.auth.profile.user_id));
        this.props.dispatch(fetchLoggedInUser(this.props.auth.profile.user_id));
    }

    componentWillReceiveProps(nextProps) {
        //if loggedInUse has been fetched, get the users he's following
        console.log("this props ", this.props, nextProps);
        if(this.props.userStore.loggedInUser === null && nextProps.userStore.loggedInUser) {
            this.props.dispatch(fetchFollowedUsers(nextProps.userStore.loggedInUser.followingUsers));
        }
        if(this.props.userStore.followedUsers === null && nextProps.userStore.followedUsers) {
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
    getDataFromAddFriendModal(userToFollow){

        let updatedLoggedInUser = Object.assign({}, this.props.userStore.loggedInUser);
        let updatedUserToFollow = Object.assign({}, userToFollow);

        updatedLoggedInUser.followingUsers.push(userToFollow.user_id);
        updatedUserToFollow.followedByUsers.push(this.props.userStore.loggedInUser.user_id);

        this.props.dispatch(updateUser(updatedLoggedInUser));
        this.props.dispatch(updateUser(updatedUserToFollow))
    }

    render() {
        const {userStore, auth} = this.props;

        let friends = [];
        let componentsToRender = null;

        if(!auth.isAuthenticated){
            return <Redirect to='/homepage'/>;
        }

        if (userStore.followedUsers) {
            if(userStore.followedUsers.length > 0) {
                friends = userStore.followedUsers.map(user =>
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
        } else if(this.state.render === "loading") {

            componentsToRender = <LoadingSwirl/>;

        }else {
            componentsToRender = <div>
                                        {friends}
                                        <AddFriendModal
                                            sendData={this.getDataFromAddFriendModal.bind(this)}
                                            addedFriend = {userStore.userByEmail}
                                            dispatch = {this.props.dispatch}
                                        />
                                </div>;
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