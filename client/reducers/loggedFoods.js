/**
 * Created by Marjan on 19-Jul-17.
 */
export default function reducer(state={
    loggedFoods: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_LOGGED_FOODS": {
            return {...state, fetching: true};
        }
        case "FETCH_LOGGED_FOODS_REJECTED": {
            console.log("rejected", action.payload);
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_LOGGED_FOODS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                loggedFoods: action.payload,
            };
        }
        case "ADD_LOGGED_FOOD_FULFILLED": {
            console.log("fulfilled", action.payload);
            return {
                ...state,
                loggedFoods: [...state.loggedFoods, action.payload],
            }
        }
        case "UPDATE_LOGGED_FOOD_FULFILLED": {
            const { _id } = action.payload;
            const newLoggedFoods = [...state.loggedFoods];
            // const newLoggedFoods = state.loggedFoods.map(a => Object.assign({}, a));
            const loggedFoodToUpdate = newLoggedFoods.findIndex(loggedFood => loggedFood._id === _id);
            newLoggedFoods[loggedFoodToUpdate] = action.payload;

            return {
                ...state,
                loggedFoods: newLoggedFoods,
            }
        }
        case "DELETE_LOGGED_FOOD": {
            return {
                ...state,
                loggedFoods: state.loggedFoods.filter(loggedFood => loggedFood._id !== action.payload),
            }
        }
    }
    return state
}