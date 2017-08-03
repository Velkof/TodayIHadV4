/**
 * Created by Marjan on 19-Jun-17.
 */
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import styles from './footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    dashboardActive (match, location){
        if (location.pathname === "/" || location.pathname === "/dashboard") {
            return true
        }
    }
    foodsActive (match, location){
        if (location.pathname.substring(0, 6) === "/foods") {
            return true;
        }
    }

    render() {
        const {  onShowFoodsClick, backToFriendList} = this.props;

        return (
        <div className="footer">
            <div className="container-mob px-0">
                <div className="col-xs-5ths">
                    <NavLink exact to={'/dashboard'} style={{color: 'grey'}}   activeStyle={{color: 'black'}} isActive={this.dashboardActive} >
                        <span className={"glyphicon glyphicon-home footer-tab"}></span>
                    </NavLink>
                </div>
                <div className="col-xs-5ths" onClick={backToFriendList}>
                    <NavLink exact to={'/friends'}  style={{color: 'grey'}} activeStyle={{color: 'black'}} >
                        <span className={"glyphicon glyphicon-flash footer-tab"}></span>
                    </NavLink>
                </div>
                <div className="col-xs-5ths" onClick={onShowFoodsClick}>
                    <NavLink to={'/foods'} style={{color: 'grey'}} activeStyle={{color: 'black'}}  isActive={this.foodsActive.bind(this)}>
                        <span className={"glyphicon glyphicon-apple footer-tab"}></span>
                    </NavLink>
                </div>
                {/*<div className="col-xs-5ths">*/}
                    {/*<NavLink exact to={'/foods/add'} style={{color: 'grey'}} activeStyle={{color:"black"}} isActive={this.addFoodActive.bind(this)} >*/}
                        {/*<span className={"glyphicon glyphicon-plus footer-tab"}></span>*/}
                    {/*</NavLink>*/}
                {/*</div>*/}
                {/*<div className="col-xs-5ths">*/}
                    {/*<NavLink exact to={'/foods/adadsasd'} style={{color: 'grey'}} activeStyle={{color:"black"}}>*/}
                        {/*<span className={"glyphicon glyphicon-bell footer-tab"}></span>*/}
                    {/*</NavLink>*/}
                {/*</div>*/}
            </div>
        </div>
      );
    };
}

export default Footer;