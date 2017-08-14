/**
 * Created by Marjan on 19-Jul-17.
 */
import axios from "axios";
import moment from "moment";

const token = localStorage.getItem('id_token');

export function fetchLoggedFoods(data) {
    return function(dispatch) {

        let dateFrom = moment(data.date).format("MM/DD/YYYY");
        let dateTo =  moment(data.date).add(1, 'days').format("MM/DD/YYYY");


        dispatch({type: "FETCH_LOGGED_FOODS"});

        axios.get("http://localhost:9000/api/loggedFoods",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                },
                'params': {
                    loggedInUserId: data.loggedInUserId,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                }
            })

            .then((response) => {
                dispatch({type: "FETCH_LOGGED_FOODS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_LOGGED_FOODS_REJECTED", payload: err})
            })

    }
}

export function addLoggedFood( data) {
    return function (dispatch) {

        dispatch({type: 'ADD_LOGGED_FOOD', payload: data});

        axios.post('http://localhost:9000/api/loggedFoods', {
            name: data.name,
            amount: data.amount,
            unit: data.unit,
            units: data.units,
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
            addedBy: data.addedBy,
        }, {
            'headers':{
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(function (response) {

            dispatch({type: "ADD_LOGGED_FOOD_FULFILLED", payload: response.data})
        })
        .catch(function (err) {
            dispatch({type: "ADD_LOGGED_FOOD_REJECTED", payload: err})
        });
    }
}


export function updateLoggedFood( data) {
    return function (dispatch) {

        dispatch({type: 'UPDATE_LOGGED_FOOD', payload: data});

        axios.put('http://localhost:9000/api/loggedFoods/' + data._id, {
            name: data.name,
            amount: data.amount,
            unit: data.unit,
            units: data.units,
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
            dispatch({type: "UPDATE_LOGGED_FOOD_FULFILLED", payload: response.data})
        })
        .catch(function (err) {
            dispatch({type: "UPDATE_LOGGED_FOOD_REJECTED", payload: err})
        });
    }
}

export function deleteLoggedFood(data) {
    return function (dispatch) {

        dispatch({type: 'DELETE_LOGGED_FOOD', payload: data._id});

        axios.delete('http://localhost:9000/api/loggedFoods/' + data._id, {
            'headers':{
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(function (response) {
            dispatch({type: "DELETE_LOGGED_FOOD_FULFILLED", payload: response.data})
        })
        .catch(function (err) {
            dispatch({type: "DELETE_LOGGED_FOOD_REJECTED", payload: err})
        });
    }
}