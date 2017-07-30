/**
 * Created by Marjan on 27-Jul-17.
 */
import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
import auth0 from 'auth0-js';
import {login, logout} from "../actions/loginActions";


export default class AuthService extends EventEmitter {
    constructor(clientId, domain) {
        super();
        let _this = this;
        this.auth0 = new auth0.WebAuth({
            clientID: clientId,
            domain: domain,
            responseType: 'token id_token',
            redirectUri: `${window.location.origin}/homepage`
        });

        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.parseHash = this.parseHash.bind(this);

        if(localStorage.getItem("tokenHasBeenFetched") === "false" ) {
            window.addEventListener('load', this.parseHash);
        }
    }

    parseHash(){
        let _this = this;
        let userProfile;

        _this.auth0.authorize({
            connection: 'facebook',
        });

        this.auth0.parseHash((err, authResult) => {
            if (authResult) {
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);

                // Save the tokens from the authResult in local storage or a cookie
                _this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
                    if (error) {
                        console.log('Error loading the Profile', error)
                    } else {
                        localStorage.setItem('profile', JSON.stringify(profile));
                        // Triggers profile_updated event to update the UI
                        _this.emit('profile_updated', profile);

                        userProfile = JSON.stringify(profile);
                        login(profile, authResult.idToken );
                    }
                });

            } else if (err) {
                // Handle errors
                console.log(err);
            }
        });

        localStorage.setItem("tokenHasBeenFetched", true);

    }
    loginWithFacebook() {

        let _this = this;
        let userProfile;

        this.auth0.authorize({
            connection: 'facebook',
        });

        localStorage.setItem("tokenHasBeenFetched", false);

        // this.auth0.parseHash((err, authResult) => {
        //     if (authResult) {
        //         localStorage.setItem('access_token', authResult.accessToken);
        //         localStorage.setItem('id_token', authResult.idToken);
        //
        //         // Save the tokens from the authResult in local storage or a cookie
        //         _this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
        //             if (error) {
        //                 console.log('Error loading the Profile', error)
        //             } else {
        //                 localStorage.setItem('profile', JSON.stringify(profile));
        //                 // Triggers profile_updated event to update the UI
        //                 _this.emit('profile_updated', profile)
        //
        //                 userProfile = JSON.stringify(profile);
        //                 login(profile, authResult.idToken );
        //             }
        //         });
        //
        //     } else if (err) {
        //         // Handle errors
        //         console.log(err);
        //     }
        // });
    }

}
