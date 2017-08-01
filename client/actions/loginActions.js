/**
 * Created by Marjan on 24-Jun-17.
 */
import axios from "axios";

const token = localStorage.getItem('id_token');

export function login( profile, idToken) {
    return function (dispatch) {
        axios.post('http://localhost:9000/api/users', {
            name: profile.name,
            email: profile.email,
            picture: profile.picture_large,
            user_id: profile.user_id,
        }, {
            'headers': {
                'Authorization': 'Bearer ' + idToken,
            }
        })
            .then(function (response) {
                    dispatch({type: "ADD_USER_FULFILLED", payload: response.data});
                    dispatch({type: "LOGIN_FULFILLED", payload: response.data});
            })
            .catch(function (err) {
                    dispatch({type: "ADD_USER_REJECTED", payload: err});
                    dispatch({type: "LOGIN_REJECTED", payload: err});
            });
    }
}

export function logout() {
    return function (dispatch) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        dispatch({type: "LOGOUT_FULFILLED"});
    }
}



