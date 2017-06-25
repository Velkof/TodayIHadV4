/**
 * Created by Marjan on 18-Jun-17.
 */
import { combineReducers } from "redux";

import user from "./user";
import foods from "./foods";
import auth from "./auth";

export default combineReducers({
    user,
    foods,
    auth,
});