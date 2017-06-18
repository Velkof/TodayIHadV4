/**
 * Created by Marjan on 18-Jun-17.
 */
import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import user from "./userReducer"

export default combineReducers({
    tweets,
    user,
})