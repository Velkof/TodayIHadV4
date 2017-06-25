/**
 * Created by Marjan on 25-Jun-17.
 */
const jwtDecode = require('jwt-decode');

function checkTokenExpiry() {
    let jwt = localStorage.getItem('id_token');
    if(jwt) {
        let jwtExp = jwtDecode(jwt).exp;
        let expiryDate = new Date(0);
        expiryDate.setUTCSeconds(jwtExp);

        if(new Date() < expiryDate) {
            return true;
        }
    }
    return false;
}

function getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
}

export default function reducer(state={
    isAuthenticated: checkTokenExpiry(),
    profile: getProfile(),
    error: ''
}, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {
                ...state,
                isAuthenticated: true,
                profile: action.profile,
                error: ''
            };
        }
        case "LOGIN_ERROR": {
            return {
                ...state,
                isAuthenticated: false,
                profile: null,
                error: action.error
            };
        }
        case "LOGOUT_SUCCESS":{
            return {
                ...state,
                isAuthenticated: false,
                profile: null
            }
        }
        default:
            return state
    }
}
