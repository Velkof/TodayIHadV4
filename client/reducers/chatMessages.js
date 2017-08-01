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
        case "FETCH_CHAT_MESSAGES": {
            return {...state, fetching: true};
        }
        case "FETCH_CHAT_MESSAGES_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_CHAT_MESSAGES_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                chatMessages: action.payload,
            };
        }
        case "ADD_CHAT_MESSAGE_FULFILLED": {
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.payload],
            }
        }
    }
    return state
}