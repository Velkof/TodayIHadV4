/**
 * Created by Marjan on 19-Jun-17.
 */
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import styles from './footer.css';

class Footer extends Component {
    componentWillMount(){
        this.setState({ selectedItem: "sa" });
    }
    handleClick(event){
        this.setState({ selectedItem: "none"});
    }
    dashboardActive (match, location){
        console.log("match", location, this);
        if (location.pathname === "/" || location.pathname === "/dashboard") {
            return true
        }
    }
    render() {
      return (
        <div className="footer">
            <div className="container-mob px-0">
                <div className="col-xs-5ths">
                    <NavLink exact to={'/dashboard'} style={{color: 'grey'}}  isActive={this.dashboardActive}  activeStyle={{color: 'black'}} className={'active'} onClick={this.handleClick.bind(this)} data-id="1">
                        <span className={"glyphicon glyphicon-home footer-tab"}></span>
                    </NavLink>
                </div>
                <div className="col-xs-5ths">
                    <NavLink exact to={'/foods'} style={{color: 'grey'}} activeStyle={{color: 'black'}}>
                        <span className={"glyphicon glyphicon-apple footer-tab"}></span>
                    </NavLink>
                </div>
                <div className="col-xs-5ths">
                    <NavLink exact to={'/foods/add'} style={{color: 'grey'}} activeStyle={{color:"black"}} >
                        <span className={"glyphicon glyphicon-plus footer-tab"}></span>
                    </NavLink>
                </div>
                {/*<div className="col-xs-5ths">*/}
                    {/*<NavLink exact to={'/foods/addsad'}  style={{color: 'grey'}} activeStyle={{color: 'black'}} >*/}
                        {/*<span className={"glyphicon glyphicon-search footer-tab"}></span>*/}
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