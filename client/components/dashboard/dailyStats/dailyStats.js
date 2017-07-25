/**
 * Created by Marjan on 25-Jul-17.
 */
import React, {Component} from 'react';

class DailyStats extends Component {
    constructor(props){
        super(props);

        console.log("props", props);
    }
    render() {
        return (
            <div className="container-mob-child">
                <p className="f-size-2"> Are you sure you want to delete</p>
            </div>
        );
    };
}

export default DailyStats;