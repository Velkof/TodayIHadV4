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
    }
    render() {
        const {user} = this.props;
        return (
                <div className="container-mob-child">
                    <div className="">
                       <h3>CHAT WINDOW</h3>
                    </div>
                </div>
        );
    };
}

export default Chat;