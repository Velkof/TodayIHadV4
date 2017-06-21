/**
 * Created by Marjan on 21-Jun-17.
 */
export default function reducer(state={
    foods: [],
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
        case "ADD_FOOD": {
            return {
                ...state,
                foods: [...state.foods, action.payload],
            }
        }
        case "UPDATE_FOOD": {
            const { id, text } = action.payload;
            const newFoods = [...state.foods];
            const foodToUpdate = newFoods.findIndex(food => food.id === id);
            newFoods[foodToUpdate] = action.payload;

            return {
                ...state,
                foods: newFoods,
            }
        }
        case "DELETE_FOOD": {
            return {
                ...state,
                foods: state.foods.filter(food => food.id !== action.payload),
            }
        }
    }

    return state
}