/**
 * Created by Marjan on 01-Aug-17.
 */

import React, {Component} from 'react';

class Friend extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        $.material.init();
    }
    handleClick(user, event){
        event.stopPropagation();

        let data = {
            action: event.target.id,
            user: user
        };

        this.props.sendData(data);
    }
    render() {
        const {user} = this.props;

        return (
            <div className="col-xs-4 mt-2"  onClick={this.handleClick.bind(this, user)}>
                <div>
                    <img  id="viewProfile" src={user.picture_large} alt="Profile picture" height="85" width="85"
                          style={{borderRadius:"50%", 	display: "block", margin:"0 auto"}}/>
                </div>
                <div className="mt-1" style={{textAlign:"center", fontWeight:"bold", color:"#4f5256"}}>
                    <p className="f-size-1_3">{user.name}</p>
                </div>
                <div id="chat" onClick={this.handleClick.bind(this, user)}>
                    chat with user
                </div>
            </div>
        );
    };
}

export default Friend;