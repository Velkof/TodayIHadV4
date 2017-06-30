/**
 * Created by Marjan on 29-Jun-17.
 */
import * as React from "react";
import Routes from "../../routes";
import FooterNonAuthorized from "../../components/footerNonAuthorized/footerNonAuthorized";
import {connect} from "react-redux";

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
                <div className="main-layout container-mob bg-c-white">
                    <h1>HOMEPAGE</h1>
                </div>
                <FooterNonAuthorized/>
            </div>
        )
    }
};
