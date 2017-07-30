/**
 * Created by Marjan on 27-Jul-17.
 */
import AuthService from './AuthService';
const auth = new AuthService(APP_CONFIG.auth.clientId, APP_CONFIG.auth.clientDomain);

export default auth;
