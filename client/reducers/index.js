/**
 * Created by Marjan on 18-Jun-17.
 */
import { combineReducers } from "redux"

import tweets from "./tweets"
import user from "./user"

export default combineReducers({
    tweets,
    user,
})