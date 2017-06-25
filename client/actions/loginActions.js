/**
 * Created by Marjan on 24-Jun-17.
 */
import { CALL_API } from '../middleware/api';
import config from '../config/index';

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
            redirect: true,
            redirectUrl: APP_CONFIG.auth.callbackUrl,
            sso: true
        },
        autoclose: true,
    };

    const lock = new Auth0Lock(APP_CONFIG.auth.clientId, APP_CONFIG.auth.clientDomain, options);

    return dispatch => {
        lock.show((err, profile, token) => {
            if(err) {
                return dispatch(loginError(err))
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', token);
            return dispatch(loginSuccess(profile));
        })
    }
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

