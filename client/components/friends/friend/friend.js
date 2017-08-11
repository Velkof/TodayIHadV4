/**
 * Created by Marjan on 01-Aug-17.
 */

import React, {Component} from 'react';
import styles from './friend.css';

class Friend extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        $.material.init();
    }
    handleClick(user, event){

        let data = {
            action: event.target.id,
            user: user
        };

        console.log("adasd", data);

        this.props.sendData(data);
    }
    render() {
        const {user} = this.props;
        let userName = "";

        if(user.name.length > 24) {
            userName = user.name.substring(0, 24) + "...";
        } else {
            userName = user.name;
        }

        return (
            <div>
                <div className="col-xs-4 mt-2 px-0"  onClick={this.handleClick.bind(this, user)} style={{height:"12em"}}>
                    <div className="profileContainer">
                        <img  id="friendProfile" src={user.picture_large} alt="Profile picture" height="85" width="85"  style={{cursor:"pointer"}}/>
                        <div id="chat" className="c-green-success"  style={{cursor:"pointer"}} onClick={this.handleClick.bind(this, user)}>
                            {this.props.unseenMessagesCount}
                        </div>
                    </div>
                    <div className="truncate" style={{textAlign:"center", fontWeight:"bold", color:"#4f5256",  textOverflow: "ellipsis"}}>
                        <p className="f-size-1_3">{userName}</p>
                    </div>

                </div>
                {/*<div className="col-xs-4 mt-2 px-0"  onClick={this.handleClick.bind(this, user)} style={{height:"12em"}}>*/}
                    {/*<div>*/}
                        {/*<img  id="friendProfile" src={user.picture_large} alt="Profile picture" height="85" width="85"  style={{cursor:"pointer"}}/>*/}
                    {/*</div>*/}
                    {/*<div className="mt-1 truncate" style={{textAlign:"center", fontWeight:"bold", color:"#4f5256",  textOverflow: "ellipsis"}}>*/}
                        {/*<p className="f-size-1_3">{userName}</p>*/}
                    {/*</div>*/}
                    {/*<div id="chat"  className="c-green-success"  style={{cursor:"pointer"}} onClick={this.handleClick.bind(this, user)}>*/}
                        {/*{this.props.unseenMessagesCount}*/}
                    {/*</div>*/}
                {/*</div>*/}

            </div>
        );
    };
}

export default Friend;