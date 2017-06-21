/**
 * Created by Marjan on 21-Jun-17.
 */
import axios from "axios";

export function fetchFoods() {
    return function(dispatch) {
        dispatch({type: "FETCH_FOODS"});

        axios.get("http://localhost:9000/api/foods")
            .then((response) => {
                dispatch({type: "FETCH_FOODS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_FOODS_REJECTED", payload: err})
            })
    }
}

export function addFood(id, name) {
    return {
        type: 'ADD_FOOD',
        payload: {
            id,
            name,
        },
    }
}

export function updateFood(id, name) {
    return {
        type: 'UPDATE_FOOD',
        payload: {
            id,
            name,
        },
    }
}

export function deleteFood(id) {
    return { type: 'DELETE_FOOD', payload: id}
}