/**
 * Created by Marjan on 20-Jul-17.
 */
import React, {Component} from 'react';

class DashboardNavBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { onFoodLogClick, onStatsClick, render} = this.props;

        let showFoodLogActive = "";
        let showStatsActive = "";

        if (render === "foodLog") {
            showFoodLogActive = "active";
            showStatsActive = "";
        } else {
            showFoodLogActive = "";
            showStatsActive = "active";
        }


        return (
            <div className="container-mob-child px-0 col-xs-12 mb-1">
                <ul className="nav nav-tabs">
                    <li className="col-xs-6 nav-item" onClick={onFoodLogClick}>
                        <a className={"nav-link "  + showFoodLogActive} href="javascript:void(0)">Food Log</a>
                    </li>
                    <li className="col-xs-6 nav-item" onClick={onStatsClick}>
                        <a className={"nav-link " + showStatsActive} href="javascript:void(0)">Stats</a>
                    </li>
                </ul>
            </div>
        );
    };
}

export default DashboardNavBar;