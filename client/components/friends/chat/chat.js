/**
 * Created by Marjan on 01-Aug-17.
 */
import React, {Component} from 'react';
import styles from './chat.css';
import {addChatMessage, fetchChatMessagesBetweenUsers} from "../../../actions/chatActions";

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
    }
    handleClick(event){
        event.stopPropagation();
        this.props.backToFriendList();
    }
    handleChange = (e) => this.setState({[e.target.id]: e.target.value });
    render() {
        const {friend, chatMessages} = this.props;
        let messages = [];
        let messageStyle = {};
        let message;

        if(chatMessages.length > 0){

            chatMessages.forEach(function (message) {

                if(message.receiver === friend.user_id) {
                    messageStyle = {float: "right"}
                } else {
                    messageStyle = {float: "left"}
                }
                message = (
                    <div style={{clear:"both"}} key={message._id} >
                        <div className="container-mob-child col-xs-8" style={messageStyle}>
                            <span className="f-size-2 c-green">{message.message}  </span>
                        </div>
                    </div>);

                messages.push(message);
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
                    <div className="container-mob-child col-xs-9">
                        <div className="">
                            <h4>Chatting with {friend.name}<img src={friend.picture} alt="profile picture" height={20} width={20}/></h4>
                        </div>
                    </div>
                </div>
                    <br/>
                    <br/>
                    <br/>
                <div className="">
                    {messages}
                </div>
                <div className="chat-form form-group pb-0">
                    <div id="message-input" className="col-xs-10 mx-0">
                            <input id="message"  type="text" className="form-control mb-0" autoComplete="off" placeholder="Write a message..."
                                   value={this.state.message  || ''} onChange={this.handleChange.bind(this)}
                            />
                    </div>
                    <div className="col-xs-1 col-xs-offset-1 mx-0" onClick={this.addMessage.bind(this)}>
                        <span id="send-message-btn" className="glyphicon glyphicon-send f-size-2_5 c-grey lh-2"></span>
                    </div>
                </div>
            </div>
        );
    };
}

export default Chat;