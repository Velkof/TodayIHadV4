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
        }
    }
    handleChange(e){
        this.setState({friendsEmail:e.target.value})
    }
    render() {
        let _this = this;
        let addedFriend;


        if(this.props.addedFriend === null) {
            addedFriend = <div>
                <span className="c-red-important-info">There is no user with that email. Please try again.</span>
            </div>;
        } else if(this.props.addedFriend.user_id ) {
            addedFriend =<div >
                <img src={this.props.addedFriend.picture} alt="friend profile pic" height="20rem" width="20rem" style={{borderRadius:"50%"}}/>
                <span className="f-size-1_7">{this.props.addedFriend.name}</span>
            </div>;
        }


        const modal = <div className="modal modal-backdrop mr-1" style={this.state.toggle ? display : hide}>
            <div id="addFriendModal" className="modal-content">
                <div className="modal-header">
                    <button type="button" className="closeBtn" onClick={this.toggle.bind(this)}>&times;</button>
                    <h4 className="modal-title">Find and follow user</h4>
                </div>
                <div className="modal-body">
                    <div className="form-group required label-floating  col-xs-9 px-0 mt-0">
                        <label className="control-label">Friend's email</label>
                        <input id="name" type="email" value={this.state.friendsEmail  || ''} onChange={this.handleChange.bind(this)} className="form-control" />
                    </div>
                    <div className="form-group col-xs-3 px-0 mt-0" style={{textAlign:"center"}}>
                        <button id="addFriend" className="btn btn-success" onClick={this.handleClick.bind(this)}>Find</button>
                    </div>
                    <div>
                        {addedFriend}
                    </div>
                </div>
                <div className="modal-footer full-width" style={{clear:"both"}} onClick={this.handleClick.bind(this)}>
                    <a id="followUser" className="btn c-white bg-c-green-success full-width">Follow user</a>
                </div>
            </div>
        </div>;
        return (
            <div>
                <div id="follow-friends-btn-container" onClick={this.toggle.bind(this)}>
                    <div id="follow-friends-btn" className="btn btn-success my-0">
                        follow user
                    </div>
                </div>
                {modal}
            </div>
        );
    }
}