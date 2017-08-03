/**
 * Created by Marjan on 01-Aug-17.
 */
import React, {Component} from 'react';
import styles from './chat.css';
import {addChatMessage, fetchChatMessagesBetweenUsers} from "../../../actions/chatActions";
import Message from "../message/message";


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
    addMessage(){
        this.props.dispatch(addChatMessage(this.state));
        this.setState({message:""});
    }
    componentDidUpdate(){
        this.messagesEnd.scrollIntoView();
    }
    handleClick(event){
        event.stopPropagation();
        this.props.backToFriendList();
    }
    handleChange = (e) => this.setState({[e.target.id]: e.target.value });
    render() {
        const {friend, chatMessages} = this.props;
        let messages = [];
        let loadMoreMessages = "";

        if(chatMessages.length % 15 === 0 ) {
            loadMoreMessages =  <button className="btn btn-default col-xs-12">Load more messages</button>;
        } else {
            loadMoreMessages = <div style={{textAlign:"center"}}><p>No more messages...</p></div>;
        }

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
                    <div id="chatting-with-container" className="full-width">
                        <div id="chatting-with">
                            <img src={friend.picture} alt="friend profile pic" height={40} width={40} style={{ marginRight:"1em"}}/>
                            <span className="f-size-1_7 lh-1_7">You're chatting with {friend.name}</span>
                        </div>
                    </div>
                    <div className="messages-container">
                        {loadMoreMessages}
                        {messages}
                        <div ref={(el) => { this.messagesEnd = el; }}></div>
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