/**
 * Created by Marjan on 01-Aug-17.
 */
import React, {Component} from 'react';
import styles from './chat.css';
import {addChatMessage, fetchChatMessagesBetweenUsers} from "../../../actions/chatActions";
import Message from "../message/message";
import * as ReactDOM from "react-dom";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            sender: this.props.user_id,
            receiver: this.props.friend.user_id,
        };
    }
    componentWillMount(){
        let data = {
            loggedInUser: this.props.user_id,
            otherUser: this.props.friend.user_id,
        };
        this.props.dispatch(fetchChatMessagesBetweenUsers(data));
        $.material.init();
    }
    componentDidMount(){

    }
    addMessage(){
        this.props.dispatch(addChatMessage(this.state));
        this.setState({message:""});
    }
    scrollToBottom() {
        this.messagesEnd.scrollIntoView();
    }
    componentDidUpdate(){
        this.scrollToBottom();
    }
    handleClick(event){
        event.stopPropagation();
        this.props.backToFriendList();
    }
    handleChange = (e) => this.setState({[e.target.id]: e.target.value });
    render() {
        const {friend, chatMessages} = this.props;
        let messages = [];

        if(chatMessages.length > 0){

            chatMessages.forEach(function (message) {
                messages.push(<Message
                                key = {message._id}
                                message = {message}
                                friend = {friend}
                              />);
            });

        } else {
            messages = <div className="container-mob-child">
                            <p className="f-size-2">You don't have any messages with this user.</p>
                       </div>;
        }

        return (<div>
                <div>
                    <div className="px-0 col-xs-3">
                        <div id="back-to-friends" className="btn btn-default pl-0 f-size-1_5" onClick={this.handleClick.bind(this)}>
                            <span className="glyphicon glyphicon-chevron-left" style={{lineHeight:"1.2em"}}></span>
                            <span>friends</span>
                        </div>
                    </div>
                    <div className="col-xs-9 f-size-1_7 lh-3">
                        <div style={{float:"right"}}>
                            <p>Chatting with {friend.name}</p>
                        </div>
                    </div>
                </div>
                <div className="messages-container">
                    {messages}
                    <div id="scroll-down-target"   ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
                <div className="chat-form-container pb-0 px-0 mx-0">
                    <div className="chat-form form-group">
                        <div id="message-input" className="col-xs-9 px-1 mb-0">
                                <input id="message"  type="text" className="form-control mb-0 pb-0" autoComplete="off" placeholder="Write a message..."
                                       value={this.state.message  || ''} onChange={this.handleChange.bind(this)}
                                />
                        </div>
                        <div className="col-xs-3 px-1" onClick={this.addMessage.bind(this)} style={{textAlign:"center"}}>
                            <span id="send-message-btn" className="btn btn-success px-0 mx-0 my-0_5">Send</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Chat;