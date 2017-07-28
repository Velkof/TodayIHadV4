/**
 * Created by Marjan on 24-Jun-17.
 */
import axios from "axios";
import history from "../history";
import { EventEmitter } from 'events';
import * as auth0 from "auth0-js";
import qs from "qs/dist/qs";

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';


export function login() {
    // const options = {
    //     auth: {
    //         redirect: false,
    //         redirectUrl: APP_CONFIG.auth.callbackUrl,
    //         sso: true,
    //         responseType: 'token',
    //         params: {scope: 'openid name email picture roles user_metadata app_metadata'},
    //     },
    //     theme: {
    //         logo: '',
    //         primaryColor: '#15854f'
    //     },
    //     languageDictionary: {
    //         title: "TodayIHad"
    //     },
    //     autoclose: true,
    // };
    //
    // const lock = new Auth0Lock(APP_CONFIG.auth.clientId, APP_CONFIG.auth.clientDomain, options);
    //
    // lock.show();
    let _this = this;


    let auth1 = new auth0.WebAuth({
        clientID: "YMaeM9OciPKhuqerE13BScW1SgoYC5jP",
        domain: "marjanian.eu.auth0.com",
        responseType: 'token id_token',
        redirectUri: `${window.location.origin}/homepage`
    });


    auth1.authorize({
        connection: 'facebook',
    });

    let authResult1;
    let profile1;


    auth1.parseHash((err, authResult) => {

        if (authResult) {
            console.log("authResult", authResult);


            // Save the tokens from the authResult in local storage or a cookie
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            authResult1 = authResult;

            auth1.client.userInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    console.log('Error loading the Profile', error)
                } else {
                    profile1 = JSON.stringify(profile);
                    localStorage.setItem('profile', JSON.stringify(profile));
                    // Triggers profile_updated event to update the UI
                    _this.emit('profile_updated', profile)

                }
            })
        } else if (err) {
            // Handle errors
            console.log(err);
        }
    });


    return function(dispatch) {

        // lock.on("authenticated", function(authResult) {
        //     lock.getUserInfo(authResult.accessToken, function(error, profile) {
        //         if (error) {
        //             return dispatch(loginRejected(error))
        //         }
        //
        //         axios.post('http://localhost:9000/api/users', {
        //             name: profile.name,
        //             email: profile.email,
        //         })
        //         .then(function (response) {
        //             dispatch({type: "ADD_USER_FULFILLED", payload: response.data})
        //         })
        //         .catch(function (err) {
        //             dispatch({type: "ADD_USER_REJECTED", payload: err})
        //         });
        //
        //         localStorage.setItem('id_token', authResult.idToken);
        //         localStorage.setItem("profile", JSON.stringify(profile));
        //
        //         history.push('/');
        //
        //         return dispatch(loginFulfilled(authResult.profile));
        //
        //     });
        // });


        axios.post('http://localhost:9000/api/users', {
                    name: profile1.name,
                    email: profile1.email,
                })
                .then(function (response) {
                    dispatch({type: "ADD_USER_FULFILLED", payload: response.data})
                })
                .catch(function (err) {
                    dispatch({type: "ADD_USER_REJECTED", payload: err})
                });

                history.push('/');

                return dispatch(loginFulfilled(profile1));


    };
}


function logoutFulfilled(profile) {
    return {
        type: LOGOUT_FULFILLED
    }
}

function loginFulfilled(profile) {
    return {
        type: LOGIN_FULFILLED,
        profile
    }
}

function loginRejected(err) {
    return {
        type: LOGIN_REJECTED,
        err
    }
}

export function logout() {
    return dispatch => {
        history.push('/homepage');
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        return dispatch(logoutFulfilled());
    }
}




