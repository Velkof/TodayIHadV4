/**
 * Created by Marjan on 27-Jul-17.
 */
import { isTokenExpired } from './jwtHelper';
import auth0 from 'auth0-js';
import {login, logout} from "../actions/loginActions";
import * as React from "react";
import history from '../history';


export default class AuthService extends React.Component {
    constructor(clientId, domain) {
        super();

        let _this = this;
        this.auth0 = new auth0.WebAuth({
            clientID: clientId,
            domain: domain,
            responseType: 'token id_token',
            redirectUri: `${window.location.origin}/callback`,
            usePostMessage: true,
            postMessageDataType: 'authResult',
        });


        let id_token = localStorage.getItem("id_token");

        if(id_token && isTokenExpired(id_token) === true) {
            console.log("2");
            _this.auth0.renewAuth({
                audience: '',
                scope: 'openid profile',
                redirectUri: `${window.location.origin}/callback`,
                usePostMessage: true,
                postMessageDataType: 'authResult',
            }, function (err, authResult) {
                // err if automatic parseHash fails
                if (err) {
                    alert("Error getting new tokenzxxz: " + JSON.stringify(err));
                }
                else {
                    console.log("authResult", err,authResult);

                    if (authResult.idToken) {
                        // that.storage.set('id_token', authResult.idToken);
                        // that.idToken = authResult.idToken;
                        // console.log("Got new token: " + that.idToken);
                    }
                    else {
                        console.log("Tried to get new token, but got null!");
                    }
                }
            });
        }

        this.receiveMessage = this.receiveMessage.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);

        window.addEventListener("message", this.receiveMessage, false);
    }

    loginWithFacebook() {
        this.auth0.authorize({
            connection: 'facebook',
        });
    }

    receiveMessage(event) {

        let authResult;
        let profile;

        if (event.origin !== window.location.origin || !event.data.type || event.data.type !== 'authResult') {
            return;
        }

        if (event.data.authResult && event.data.profile) {
            authResult = event.data.authResult;
            profile = event.data.profile;

            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('profile', JSON.stringify(profile));

            history.replace("/");
        }

        window.removeEventListener("message", this.receiveMessage);
        login(profile, authResult.idToken);
    }
}
