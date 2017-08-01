/**
 * Created by Marjan on 01-Aug-17.
 */
import axios from "axios";

const token = localStorage.getItem('id_token');

export function fetchChatMessages() {
    return function(dispatch) {

        dispatch({type: "FETCH_CHAT_MESSAGES"});

        axios.get("http://localhost:9000/api/chatMessages",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                }
            })
            .then((response) => {
                dispatch({type: "FETCH_CHAT_MESSAGES_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_CHAT_MESSAGES_REJECTED", payload: err})
            })
    }
}

export function addChatMessage( data) {
    return function (dispatch) {

        dispatch({type: 'ADD_CHAT_MESSAGE', payload: data});

        axios.post('http://localhost:9000/api/chatMessages', {
            sender: data.sender,
            receiver: data.receiver,
            message: data.message,
            seen: data.seen,

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
