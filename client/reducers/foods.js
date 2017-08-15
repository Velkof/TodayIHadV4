/**
 * Created by Marjan on 21-Jun-17.
 */
export default function reducer(state={
    foods: null,
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch (action.type) {
        case "FETCH_FOODS": {
            return {...state, fetching: true};
        }
        case "FETCH_FOODS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_FOODS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                foods: action.payload,
            };
        }
        case "ADD_FOOD_FULFILLED": {
            return {
                ...state,
                foods: [...state.foods, action.payload],
            }
        }
        case "UPDATE_FOOD_FULFILLED": {
            const { _id } = action.payload;
            const newFoods = [...state.foods];
            // const newFoods = state.foods.map(a => Object.assign({}, a));
            const foodToUpdate = newFoods.findIndex(food => food._id === _id);
            newFoods[foodToUpdate] = action.payload;

            return {
                ...state,
                foods: newFoods,
            }
        }
        case "DELETE_FOOD": {
            return {
                ...state,

                foods: state.foods.filter(food => food._id !== action.payload),
            }
        }
    }

    return state
}