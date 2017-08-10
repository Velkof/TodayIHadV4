/**
 * Created by Marjan on 01-Aug-17.
 */
export default function reducer(state={
    chatMessages: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_CHAT_MESSAGES_BETWEEN_USERS": {
            return {...state, fetching: true};
        }
        case "FETCH_CHAT_MESSAGES_BETWEEN_USERS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                chatMessages: action.payload,
            };
        }
        case "FETCH_CHAT_MESSAGES_BETWEEN_USERS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_CHAT_MESSAGES_FOR_FOLLOWED_USERS": {
            return {...state, fetching: true};
        }
        case "FETCH_CHAT_MESSAGES_FOR_FOLLOWED_USERS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                chatMessages: action.payload,
            };
        }
        case "FETCH_CHAT_MESSAGES_FOR_FOLLOWED_USERS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "ADD_CHAT_MESSAGE_FULFILLED": {
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.payload],
            }
        }
        case "ADD_CHAT_MESSAGE_REJECTED": {
            return {
                ...state,
                error: action.payload,
            }
        }
    }
    return state
}