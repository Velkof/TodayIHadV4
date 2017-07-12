/**
 * Created by Marjan on 24-Jun-17.
 */
import axios from "axios";
import Auth0Lock from 'auth0-lock';
import history from "../history";

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';


export function login() {
    const options = {
        auth: {
            redirect: false,
            redirectUrl: APP_CONFIG.auth.callbackUrl,
            sso: true,
            responseType: 'token',
            params: {scope: 'openid name email picture roles user_metadata app_metadata'},
        },
        theme: {
            logo: '',
            primaryColor: '#15854f'
        },
        languageDictionary: {
            title: "TodayIHad"
        },
        autoclose: true,
    };

    const lock = new Auth0Lock(APP_CONFIG.auth.clientId, APP_CONFIG.auth.clientDomain, options);

    lock.show();

    return function(dispatch) {

        lock.on("authenticated", function(authResult) {
            lock.getUserInfo(authResult.accessToken, function(error, profile) {
                if (error) {
                    return dispatch(loginRejected(error))
                }

                axios.post('http://localhost:9000/api/users', {
                    name: profile.name,
                    email: profile.email,
                })
                .then(function (response) {
                    dispatch({type: "ADD_USER_FULFILLED", payload: response.data})
                })
                .catch(function (err) {
                    dispatch({type: "ADD_USER_REJECTED", payload: err})
                });

                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem("profile", JSON.stringify(profile));

                history.push('/');

                return dispatch(loginFulfilled(authResult.profile));

            });
        });

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




