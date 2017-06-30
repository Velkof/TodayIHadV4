/**
 * Created by Marjan on 19-Jun-17.
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import styles from './footer.css';


class Footer extends Component {
    render() {
      return (
        <div className="footer">
            <div className="container-mob px-0">
                <div className="col-xs-5ths">
                    <Link to={'/dashboard'} ><span className="glyphicon glyphicon-home footerTab"></span></Link> <br/><br/>
                </div>
                <div className="col-xs-5ths">
                    <Link to={'/foods/add'} ><span className="glyphicon glyphicon-search footerTab" ></span></Link><br/><br/>
                </div>
                <div className="col-xs-5ths">
                    <Link to={'/foods/add'} ><span className="glyphicon glyphicon-plus footerTab" ></span></Link><br/><br/>
                </div>
                <div className="col-xs-5ths">
                    <Link to={'/foods'} ><span className="glyphicon glyphicon-apple footerTab"></span></Link><br/><br/>
                </div>
                <div className="col-xs-5ths">
                    <Link to={'/foods/add'} ><span className="glyphicon glyphicon-bell footerTab" ></span></Link><br/><br/>
                </div>
            </div>
        </div>
      );
    };
}

export default Footer;