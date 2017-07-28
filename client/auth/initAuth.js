/**
 * Created by Marjan on 27-Jul-17.
 */
import AuthService from './AuthService';
import * as APP_CONFIG from "../config/auth";

// const auth = new AuthService(process.env.REACT_APP_AUTH_CLIENT_ID, process.env.REACT_APP_AUTH_DOMAIN_ADDRESS)
const auth = new AuthService("YMaeM9OciPKhuqerE13BScW1SgoYC5jP", "marjanian.eu.auth0.com");

export default auth;
