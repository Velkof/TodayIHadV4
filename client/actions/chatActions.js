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
                loggedInUser: data.loggedInUser,
                otherUser: data.otherUser,
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

export function addChatMessage( data) {
    return function (dispatch) {

        axios.post('http://localhost:9000/api/chatMessages', {
            sender: data.sender,
            receiver: data.receiver,
            message: data.message,
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
    }
}
