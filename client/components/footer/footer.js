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
            <div className="container-mob">
                <div className="col-xs-3">
                    <Link to={'/dashboard'} ><span className="glyphicon glyphicon-home" style={{fontSize:'2rem'}}></span></Link> <br/><br/>
                </div>
                <div className="col-xs-3">
                    <Link to={'/foods'} ><span className="glyphicon glyphicon-apple" style={{fontSize:'2rem'}}></span></Link><br/><br/>
                </div>
                <div className="col-xs-3">
                    <Link to={'/foods/add'} ><span className="glyphicon glyphicon-plus" style={{fontSize:'2rem'}}></span></Link><br/><br/>
                </div>
            </div>
        </div>
      );
    };
}

export default Footer;