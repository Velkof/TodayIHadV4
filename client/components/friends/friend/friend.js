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
            <div className="col-xs-4" onClick={this.handleClick.bind(this, user)}>
                <div className="container-mob-child">
                    <div className="">
                        <img  id="viewProfile" src={user.picture} alt="Profile picture" height="42" width="42"/>
                        <p className="">{user.name}</p>
                        <div id="chat" onClick={this.handleClick.bind(this, user)}>
                            chat with user
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Friend;