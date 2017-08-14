/**
 * Created by Marjan on 10-Aug-17.
 */
import React, {Component} from 'react';
import styles from './friendProfile.css';

class FriendProfile extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        $.material.init();
    }
    render() {
        const {friend} = this.props;

        return (
            <div className="" style={{textAlign:"center"}}>
                <img  id="friendProfile" className="cursor-pointer mt-1" src={friend.picture_large} alt="Profile picture" height="120" width="120"  />
                <h4>{friend.name}</h4>
            </div>
        );
    };
}

export default FriendProfile;