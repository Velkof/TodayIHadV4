/**
 * Created by Marjan on 04-Aug-17.
 */
import React, {Component} from 'react';
import styles from './modal.css';
import {findUserByEmail} from "../../actions/userActions";

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

export default class AddFriendModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false,
            friendsEmail: "",
        };
    }

    componentDidMount(){
        $.material.init();
    }
    toggle(e) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }
    handleClick(e){
        let _this = this;

        if(e.target.id === "addFriend") {
            this.props.dispatch(findUserByEmail(this.state.friendsEmail));
            this.setState({friendsEmail:""});

        } else if (e.target.id === "followUser") {
            this.setState(prevState => ({
                toggle: !prevState.toggle
            }));
            this.props.sendData(_this.props.addedFriend);
        } else if (e.target.id === "closeBtn") {
            this.setState({toggle:false});
            this.props.sendData("removeAddedFriend");
        }
    }
    handleChange(e){
        this.setState({friendsEmail:e.target.value})
    }
    render() {
        let _this = this;
        let addedFriend;
        let followUserBtn;

        if(this.props.addedFriend === null) {
            addedFriend = <div>
                <span className="c-red-important-info">There is no user with that email. Please try again.</span>
            </div>;
        } else if(this.props.addedFriend.user_id) {
            if(this.props.addedFriend.user_id === this.props.loggedInUser.user_id) {
                addedFriend = <div>
                    <span className="c-red-important-info">You have entered your own email. Please try again.</span>
                </div>;
            } else if(this.props.loggedInUser.followingUsers.indexOf(this.props.addedFriend.user_id) > -1){
                addedFriend = <div>
                    <span className="c-red-important-info">You are already following this user.</span>
                </div>;
            } else {
                addedFriend =<div >
                    <div>
                        <img  id="friendProfile" src={this.props.addedFriend.picture_large} alt="Profile picture" height="85" width="85"
                        style={{borderRadius:"50%",
                            display: "block",
                            margin: "0 auto",
                            border: "1px solid white",}}/>
                    </div>
                    <div className="mt-1" style={{textAlign:"center", fontWeight:"bold", color:"#4f5256"}}>
                        <p className="f-size-1_3">{this.props.addedFriend.name}</p>
                    </div>
                </div>;

                followUserBtn = (
                            <div onClick={this.handleClick.bind(this)}>
                                <a id="followUser" className="btn c-white bg-c-green-success full-width">Follow user</a>
                            </div>
                );
            }
        }

        const modal = <div className="modal modal-backdrop mr-1" style={this.state.toggle ? display : hide}>
            <div id="addFriendModal" className="modal-content">
                <div className="modal-header">
                    <button id="closeBtn" type="button" className="closeBtn" onClick={this.handleClick.bind(this)}>&times;</button>
                    <h4 className="modal-title">Find and follow user</h4>
                </div>
                <div className="modal-body">
                    <div className="form-group required label-floating  col-xs-9 px-0 mt-0">
                        <label className="control-label">Friend's email</label>
                        <input id="name" type="email" value={this.state.friendsEmail  || ''} onChange={this.handleChange.bind(this)} className="form-control" />
                    </div>
                    <div className="form-group col-xs-3 px-0 mt-0" style={{textAlign:"center"}}>
                        <button id="addFriend" className="btn btn-success px-1" onClick={this.handleClick.bind(this)}>Find</button>
                    </div>
                    <div>
                        {addedFriend}
                    </div>
                </div>
                <div className="modal-footer full-width" style={{clear:"both"}} >
                    {followUserBtn}
                </div>

            </div>
        </div>;
        return (
            <div>
                <div className="col-xs-4 mt-2 px-0"  style={{height:"12em", textAlign:"center"}}>
                    <div className="addFriendBtnContainer">
                        <div className="addFriendBtn " onClick={this.toggle.bind(this)} >
                            <i className="glyphicon glyphicon-plus material-icons"></i>
                        </div>
                    </div>
                    <div className="" style={{textAlign:"center", fontWeight:"bold", color:"#4f5256",  textOverflow: "ellipsis"}}>
                        <p className="f-size-1_3">Follow friend</p>
                    </div>
                </div>
                {modal}
            </div>



    );
    }
}