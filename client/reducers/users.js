/**
 * Created by Marjan on 18-Jun-17.
 */

export default function reducer(state={
    users: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_USERS": {
            return {...state, fetching: true};
        }
        case "FETCH_USERS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_USERS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload,
            };
        }
        case "ADD_USER_FULFILLED": {
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        }
        case "UPDATE_USER_FULFILLED": {
            const { _id } = action.payload;
            const newUsers = [...state.users];
            const userToUpdate = newUsers.findIndex(user => user._id === _id);
            newUsers[userToUpdate] = action.payload;

            return {
                ...state,
                users: newUsers,
            }
        }
        case "DELETE_USER": {
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
            }
        }
    }

    return state
}
