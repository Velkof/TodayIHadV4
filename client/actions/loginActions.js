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

    let _this = this;
    let userProfile;

    let WebAuth = new auth0.WebAuth({
        clientID: "YMaeM9OciPKhuqerE13BScW1SgoYC5jP",
        domain: "marjanian.eu.auth0.com",
        responseType: 'token id_token',
        redirectUri: `${window.location.origin}/homepage`
    });

    WebAuth.authorize({
        connection: 'facebook',
    });


    WebAuth.parseHash((err, authResult) => {

        if (authResult) {
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);

            // Save the tokens from the authResult in local storage or a cookie
            WebAuth.client.userInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    console.log('Error loading the Profile', error)
                } else {
                    localStorage.setItem('profile', JSON.stringify(profile));
                    // Triggers profile_updated event to update the UI
                    // _this.emit('profile_updated', profile)
                    // history.push('/');
                    userProfile = JSON.stringify(profile);

                }
            })
        } else if (err) {
            // Handle errors
            console.log(err);
        }
    });
    return function(dispatch) {
        axios.post('http://localhost:9000/api/users', {
            name: userProfile.name,
            email: userProfile.email,
        })
            .then(function (response) {
                dispatch({type: "ADD_USER_FULFILLED", payload: response.data})
            })
            .catch(function (err) {
                dispatch({type: "ADD_USER_REJECTED", payload: err})
            });

        // history.push('/');


        return dispatch(loginFulfilled(userProfile));

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




