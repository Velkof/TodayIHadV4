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
                <Link to={'/dashboard'} >DashboardContainer</Link> <br/><br/>
                <Link to={'/foods'} >FoodsContainer</Link><br/><br/>
            </div>
        </div>
      );
    };
}

export default Footer;