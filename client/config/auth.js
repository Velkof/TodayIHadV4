/**
 * Created by Marjan on 24-Jun-17.
 */
module.exports = {
    auth: {
        clientId: process.env.AUTH0_CLIENT_ID,
        clientDomain: process.env.AUTH0_DOMAIN,
        callbackUrl: process.env.AUTH0_CALLBACK_URL,
    }
};
