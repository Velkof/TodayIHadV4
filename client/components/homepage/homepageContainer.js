/**
 * Created by Marjan on 29-Jun-17.
 */
import * as React from "react";
import Header from "../header/header";
import FooterNonAuthorized from "../footerNonAuthorized/footerNonAuthorized";
import {connect} from "react-redux";
import LogInButton from "../login/LogInButton";
import AuthService from "../../auth/AuthService";

@connect((store) => {
    return {
        auth: store.auth.isAuthenticated
    };
})
export default class HomepageContainer extends React.Component {
    render() {
        const { auth } = this.props;

        return (
            <div>
                <Header/>
                <div className="main-layout bg-c-white">
                    <h1>HOMEPAGE</h1>
                </div>
                <div>dasdsa</div>
                <div>sads</div>
                <LogInButton/>
                <FooterNonAuthorized/>
            </div>
        )
    }
};
