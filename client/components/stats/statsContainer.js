/**
 * Created by Marjan on 17-Aug-17.
 */
import React from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import LoadingBars from "../loading/loadingBars";
import Footer from "../footer/footer";
import Header from "../header/header";

import styles from "./statsContainer.css";

@connect((store) => {
    return {
        auth: store.auth,
    };
})

export default class StatsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const {auth} = this.props;

        if(!auth.isAuthenticated){
            return <Redirect to='/homepage'/>;
        }



        return (
            <div className="main-layout">
                <Header/>

                <div className="container-mob">
                    <div id="choose-date-range-container" className="full-width">
                        <div id="choose-date-range">
                        </div>
                    </div>
                    <div id="stats-container">
                        <h4>STATS CONTAINER</h4>
                    </div>
                </div>

                <Footer/>
            </div>
        )
    }
}