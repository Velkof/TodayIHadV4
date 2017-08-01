/**
 * Created by Marjan on 01-Aug-17.
 */
import React, {Component} from 'react';

class Chat extends Component {
    constructor(props) {
        super(props);
    }
    handleClick(event){
        event.stopPropagation();
        this.props.backToFriendList();
    }
    render() {
        const {friend} = this.props;

        console.log("props", this.props);

        return (<div>
                <div className="px-0">
                    <div className="btn btn-default pl-0 f-size-1_5" onClick={this.handleClick.bind(this)}>
                        <span className="glyphicon glyphicon-chevron-left" style={{lineHeight:"1.2em"}}></span>
                        <span>friends</span>
                    </div>
                </div>
                <div className="container-mob-child">
                    <div className="">
                        <h4>Chatting with {friend.name}</h4>
                    </div>
                </div>
            </div>
        );
    };
}

export default Chat;