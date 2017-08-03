/**
 * Created by Marjan on 02-Aug-17.
 */
import React, {Component} from 'react';
import moment from 'moment';

class Message extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const {message, friend} = this.props;
            let messageStyle;
            let createdAtStyle;

            if(message.receiver === friend.user_id) {
                messageStyle = {float: "right", color:"white", backgroundColor:"#3dba80", minHeight:"3em"};
                createdAtStyle = {float:"right"};
            } else {
                messageStyle = {float: "left",  color:"grey", minHeight:"3em"}
                createdAtStyle = {float:"left"};
            }



        return ( <div style={{clear:"both"}}>
                    <div className="col-xs-12 px-0">
                        <div className="container-mob-child col-xs-8 py-1 px-0_5 lh-1_5"  style={messageStyle}>
                            <span className="f-size-1_5 ">{message.message}  </span>
                        </div>
                    </div>
                    <div style={createdAtStyle}>{moment(message.createdAt).format('HH:mm DD/MM/YYYY')}</div>
                </div>
        );
    };
}

export default Message;