/**
 * Created by Marjan on 29-Jun-17.
 */
import * as React from "react";
import Routes from "../../routes";
import FooterNonAuthorized from "../../components/footerNonAuthorized/footerNonAuthorized";
import {connect} from "react-redux";
import Login from "../../components/login/Login";
import SignUp from "../../components/login/SignUp";

@connect((store) => {
    return {
        auth: store.auth.isAuthenticated
    };
})
export default class Homepage extends React.Component {
    render() {
        const { auth } = this.props;
        return (
            <div>
                {/*<div className="main-layout bg-c-white">*/}
                    {/*<h1>HOMEPAGE</h1>*/}
                {/*</div>*/}
                <div>dasdsa</div>
                <Login/>
                <div>sads</div>

                <SignUp/>
                {/*<FooterNonAuthorized/>*/}
            </div>
        )
    }
};
