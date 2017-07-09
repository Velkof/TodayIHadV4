/**
 * Created by Marjan on 08-Jul-17.
 */
import React, {Component} from 'react';

class FoodNavBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { onShowFoodsClick, onDeleteFoodClick, onEditFoodClick, render } = this.props;

        let showEditFoodActive = "";
        let showDeleteFoodActive = "";

        if (render === "editFood") {
            showEditFoodActive = "active";
            showDeleteFoodActive = "";
        } else{
            showEditFoodActive = "";
            showDeleteFoodActive = "active";
        }

        return (
            <div className="container-mob-child px-0">
                <ul className="nav nav-tabs">
                    <li className="col-xs-4 nav-item" onClick={onShowFoodsClick}>
                        <a className="nav-link" href="javascript:void(0)">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                        </a>
                    </li>
                    <li className="col-xs-4 nav-item" onClick={onEditFoodClick}>
                        <a className={"nav-link "  + showEditFoodActive} href="javascript:void(0)">Edit food</a>
                    </li>
                    <li className="col-xs-4 nav-item" onClick={onDeleteFoodClick}>
                        <a className={"nav-link " + showDeleteFoodActive} href="javascript:void(0)">Delete food</a>
                    </li>
                </ul>
            </div>
        );
    };
}

export default FoodNavBar;