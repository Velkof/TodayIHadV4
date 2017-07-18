/**
 * Created by Marjan on 21-Jun-17.
 */
import axios from "axios";

const token = localStorage.getItem('id_token');

export function fetchFoods() {
    return function(dispatch) {

        dispatch({type: "FETCH_FOODS"});

        axios.get("http://localhost:9000/api/foods",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                }
            })
        .then((response) => {
            dispatch({type: "FETCH_FOODS_FULFILLED", payload: response.data})
        })
        .catch((err) => {
            dispatch({type: "FETCH_FOODS_REJECTED", payload: err})
        })
    }
}

export function addFood( data) {
    return function (dispatch) {

        dispatch({type: 'ADD_FOOD', payload: data});

        axios.post('http://localhost:9000/api/foods', {
            name: data.name,
            amount: data.amount,
            unit: data.unit,
            units: data.units,
            ingredients: data.ingredients,
            type: data.type,
            calories: data.calories,
            protein: data.protein,
            fat: data.fat,
            carbs: data.carbs,
            sugar: data.sugar,
            fiber: data.fiber,
            cholesterol: data.cholesterol,
            fatMono: data.fatMono,
            fatPoly: data.fatPoly,
            fatSat: data.fatSat,
            sodium: data.sodium,
        }, {
            'headers':{
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(function (response) {

            dispatch({type: "ADD_FOOD_FULFILLED", payload: response.data})
        })
        .catch(function (err) {
            dispatch({type: "ADD_FOOD_REJECTED", payload: err})
        });
    }
}


export function updateFood( data) {
    return function (dispatch) {

        dispatch({type: 'UPDATE_FOOD', payload: data});

        axios.put('http://localhost:9000/api/foods/' + data.id, {
            name: data.name,
            amount: data.amount,
            unit: data.unit,
            units: data.units,
            type: data.type,
            ingredients: data.ingredients,
            calories: data.calories,
            protein: data.protein,
            fat: data.fat,
            carbs: data.carbs,
            sugar: data.sugar,
            fiber: data.fiber,
            cholesterol: data.cholesterol,
            fatMono: data.fatMono,
            fatPoly: data.fatPoly,
            fatSat: data.fatSat,
            sodium: data.sodium,
        }, {
            'headers':{
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(function (response) {
            dispatch({type: "UPDATE_FOOD_FULFILLED", payload: response.data})
        })
        .catch(function (err) {
            dispatch({type: "UPDATE_FOOD_REJECTED", payload: err})
        });
    }
}

export function deleteFood(id) {
    return function (dispatch) {

        dispatch({type: 'DELETE_FOOD', payload: id});

        axios.delete('http://localhost:9000/api/foods/' + id, {
            'headers':{
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(function (response) {
            dispatch({type: "DELETE_FOOD_FULFILLED", payload: response.data})
        })
        .catch(function (err) {
            dispatch({type: "DELETE_FOOD_REJECTED", payload: err})
        });
    }
}