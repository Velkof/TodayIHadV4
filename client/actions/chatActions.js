/**
 * Created by Marjan on 01-Aug-17.
 */
import axios from "axios";

const token = localStorage.getItem('id_token');


export function fetchChatMessagesBetweenUsers(data) {
    return function(dispatch) {

        dispatch({type: "FETCH_CHAT_MESSAGES_BETWEEN_USERS"});

        axios.get("http://localhost:9000/api/chatMessages",
        {
            'headers':{
                'Authorization': 'Bearer ' + token,
            },
            'params': {
                loggedInUserId: data.loggedInUserId,
                otherUserId: data.otherUserId,
            }
        })
        .then((response) => {
            dispatch({type: "FETCH_CHAT_MESSAGES_BETWEEN_USERS_FULFILLED", payload: response.data})
        })
        .catch((err) => {
            dispatch({type: "FETCH_CHAT_MESSAGES_BETWEEN_USERS_REJECTED", payload: err})
        })
    }
}

export function fetchChatMessagesForFollowedUsers(data) {

    return function(dispatch) {

        dispatch({type: "FETCH_CHAT_MESSAGES_FOR_FOLLOWED_USERS"});

        axios.get("http://localhost:9000/api/chatMessages",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                },
                'params': {
                    loggedInUserId: data.user_id,
                    followingUsers: data.followingUsers
                }
            })
            .then((response) => {
                dispatch({type: "FETCH_CHAT_MESSAGES_FOR_FOLLOWED_USERS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_CHAT_MESSAGES_FOR_FOLLOWED_USERS_REJECTED", payload: err})
            })
    }
}

export function addChatMessage( data) {
    return function (dispatch) {

        let loggedInUserId = data.loggedInUserId;
        let message = data.message;

        if(loggedInUserId === message.sender) {
            axios.post('http://localhost:9000/api/chatMessages', {
                sender: message.sender,
                receiver: message.receiver,
                message: message.message,
                room: message.room,
                seen: false,
            }, {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                }
            })
            .then(function (response) {
                dispatch({type: "ADD_CHAT_MESSAGE_FULFILLED", payload: response.data})
            })
            .catch(function (err) {
                dispatch({type: "ADD_CHAT_MESSAGE_REJECTED", payload: err})
            });
        } else {
            dispatch({type: "ADD_CHAT_MESSAGE_FULFILLED", payload: message})
        }
    }
}
