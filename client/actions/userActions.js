/**
 * Created by Marjan on 18-Jun-17.
 */
import axios from "axios";

const token = localStorage.getItem('id_token');

export function fetchUsers() {
    return function(dispatch) {

        dispatch({type: "FETCH_USERS"});

        axios.get("http://localhost:9000/api/users",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                }
            })
            .then((response) => {
                dispatch({type: "FETCH_USERS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_USERS_REJECTED", payload: err})
            })
    }
}

export function fetchLoggedInUser(id) {

    return function(dispatch) {

        dispatch({type: "FETCH_LOGGED_IN_USER"});

        axios.get("http://localhost:9000/api/users",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                },
                'params':{
                    user_id:id,
                },
            })
            .then((response) => {
                dispatch({type: "FETCH_LOGGED_IN_USER_FULFILLED", payload: response.data});
            }).catch((err) => {
                dispatch({type: "FETCH_LOGGED_IN_USER_REJECTED", payload: err})
            })
    }
}

export function fetchAllUsersExceptLoggedIn(data) {

    return function(dispatch) {

        dispatch({type: "FETCH_USERS"});

        axios.get("http://localhost:9000/api/users",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                },
                'params': {
                    loggedInUserId: data,
                }
            })
            .then((response) => {
                dispatch({type: "FETCH_USERS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_USERS_REJECTED", payload: err})
            })
    }
}

export function findUserByEmail(data) {

    return function(dispatch) {

        dispatch({type: "FETCH_USER_BY_EMAIL"});

        axios.get("http://localhost:9000/api/users",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                },
                'params': {
                    email: data,
                }
            })
            .then((response) => {
                dispatch({type: "FETCH_USER_BY_EMAIL_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_USER_BY_EMAIL_REJECTED", payload: err})
            })
    }
}

export function removeUserByEmail() {
    return function(dispatch) {
        dispatch({type: "REMOVE_USER_BY_EMAIL_FULFILLED", payload: null});
    }
}

export function fetchFollowedUsers(data) {
    return function(dispatch) {

        dispatch({type: "FETCH_FOLLOWED_USERS"});

        axios.get("http://localhost:9000/api/users",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                },
                'params': {
                    followedUsers: data,
                }
            })
            .then((response) => {
                dispatch({type: "FETCH_FOLLOWED_USERS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_FOLLOWED_USERS_REJECTED", payload: err})
            })
    }
}

export function updateUser ( data) {
    return function (dispatch) {
        axios.put('http://localhost:9000/api/users/' + data.user_id, {
            name: data.name,
            email: data.email,
            picture: data.picture,
            picture_large: data.picture_large,
            followingUsers: data.followingUsers,
            followedByUsers: data.followedByUsers,
            role: data.role,
        }, {
            'headers':{
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(function (response) {
            dispatch({type: "UPDATE_USER_FULFILLED", payload: response.data})
        })
        .catch(function (err) {
            dispatch({type: "UPDATE_USER_REJECTED", payload: err})
        });
    }
}
