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

        let chosenUnit = data.units.filter(function( obj ) {
            return obj.name === data.unit;
        });

        let times100g = chosenUnit[0].amountInGrams / 100;

        //calculate nutrient values per 100g
        function valuePer100g(value){
            if(value === null){
                return null;
            }

            return Math.round(value / times100g / data.amount * 10) / 10;
        }

        axios.post('http://localhost:9000/api/foods', {
            name: data.name,
            amount: data.amount,
            unit: data.unit,
            units: data.units,
            calories: valuePer100g(data.calories),
            protein: valuePer100g(data.protein),
            fat: valuePer100g(data.fat),
            carbs: valuePer100g(data.carbs),
            sugar: valuePer100g(data.sugar),
            fiber: valuePer100g(data.fiber),
            cholesterol:valuePer100g(data.cholesterol),
            fatMono: valuePer100g(data.fatMono),
            fatPoly: valuePer100g(data.fatPoly),
            fatSat: valuePer100g(data.fatSat),
            sodium: valuePer100g(data.sodium),
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
        console.log("data", data);

        //nutrient values will always be per 100g
        let chosenUnit = data.units.filter(function( obj ) {
            return obj.name === data.unit;
        });


        let times100g = chosenUnit[0].amountInGrams / 100;

        function valuePer100g(value){
            if(value === null){
                return null;
            }

            return Math.round(value / times100g / data.amount * 10) / 10;
        }

        axios.put('http://localhost:9000/api/foods/' + data.id, {
            name: data.name,
            amount: data.amount,
            unit: data.unit,
            units: data.units,
            calories: valuePer100g(data.calories),
            protein: valuePer100g(data.protein),
            fat: valuePer100g(data.fat),
            carbs: valuePer100g(data.carbs),
            sugar: valuePer100g(data.sugar),
            fiber: valuePer100g(data.fiber),
            cholesterol:valuePer100g(data.cholesterol),
            fatMono: valuePer100g(data.fatMono),
            fatPoly: valuePer100g(data.fatPoly),
            fatSat: valuePer100g(data.fatSat),
            sodium: valuePer100g(data.sodium),
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

export function deleteFood(data) {
    return function (dispatch) {

        dispatch({type: 'DELETE_FOOD', payload: data});

        axios.delete('http://localhost:9000/api/foods/' + data.id, {
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
