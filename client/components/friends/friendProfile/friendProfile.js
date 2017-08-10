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
            <div >
                <h3>FRIEND PROFILE</h3>
                <h4>{friend.name}</h4>
            </div>
        );
    };
}

export default FriendProfile;