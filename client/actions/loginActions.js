/**
 * Created by Marjan on 24-Jun-17.
 */
import axios from "axios";
import Auth0Lock from 'auth0-lock';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

function loginSuccess(profile) {
    return {
        type: LOGIN_SUCCESS,
        profile
    }
}

function loginError(err) {
    return {
        type: LOGIN_ERROR,
        err
    }
}

export function login() {
    const options = {
        auth: {
            redirect: false,
            redirectUrl: APP_CONFIG.auth.callbackUrl,
            sso: true,
            responseType: 'token',
            params: {scope: 'openid name email picture roles user_metadata app_metadata'},
        },
        autoclose: true,
    };

    const lock = new Auth0Lock(APP_CONFIG.auth.clientId, APP_CONFIG.auth.clientDomain, options);

    lock.show();


    return function(dispatch) {

        lock.on("authenticated", function(authResult) {
            console.log("authResult", authResult);
            lock.getUserInfo(authResult.accessToken, function(error, profile) {
                if (error) {
                    return dispatch(loginError(error))
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


                // localStorage.setItem("accessToken", authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem("profile", JSON.stringify(profile));
                return dispatch(loginSuccess(authResult.profile));

            });
        });

    };

    // return function(dispatch) {
    //
    //
    //     lock.show((err, profile, token) => {
    //
    //         if(err) {
    //
    //             return dispatch(loginError(err))
    //         }
    //         localStorage.setItem('profile', JSON.stringify(profile));
    //         localStorage.setItem('id_token', token);
    //         dispatch({type: 'LOGIN_SUCCESS', payload: profile});
    //
    //          return dispatch(loginSuccess(profile));
    //     })
    // }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function logoutSuccess(profile) {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        return dispatch(logoutSuccess());
    }
}




