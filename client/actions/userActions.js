/**
 * Created by Marjan on 18-Jun-17.
 */
import axios from "axios";

const token = localStorage.getItem('id_token');

export function fetchUsers() {
    return function(dispatch) {

        dispatch({type: "FETCH_USERS"});

        axios.get("http://localhost:9000/api/users",
            {
                'headers':{
                    'Authorization': 'Bearer ' + token,
                }
            })
            .then((response) => {
                dispatch({type: "FETCH_USERS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_USERS_REJECTED", payload: err})
            })
    }
}

