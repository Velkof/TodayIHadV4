/**
 * Created by Marjan on 18-Jun-17.
 */
import axios from "axios";

const token = localStorage.getItem('id_token');

// export function fetchUser() {
//     return function(dispatch) {
//
//         dispatch({type: "FETCH_USER"});
//
//         axios.get("http://localhost:9000/api/user",
//             {
//                 'headers':{
//                     'Authorization': 'Bearer ' + token,
//                 }
//             })
//             .then((response) => {
//                 dispatch({type: "FETCH_USER_FULFILLED", payload: response.data})
//             })
//             .catch((err) => {
//                 dispatch({type: "FETCH_USER_REJECTED", payload: err})
//             })
//     }
// }


export function fetchUser() {
    return {
        type: "FETCH_USER_FULFILLED",
        payload: {
            name: "Will",
            age: 35,
        }
    }
}

export function setUserName(name) {
    return {
        type: 'SET_USER_NAME',
        payload: name,
    }
}

export function setUserAge(age) {
    return {
        type: 'SET_USER_AGE',
        payload: age,
    }
}