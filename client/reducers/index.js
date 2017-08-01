/**
 * Created by Marjan on 18-Jun-17.
 */
import { combineReducers } from "redux";

import users from "./users";
import foods from "./foods";
import loggedFoods from "./loggedFoods";
import auth from "./auth";
import chatMessages from "./chat";

export default combineReducers({
    users,
    foods,
    loggedFoods,
    chatMessages,
    auth,
});