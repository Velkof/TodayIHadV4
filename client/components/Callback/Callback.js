import React, { Component } from 'react';
import * as auth0 from "auth0-js";
import loading from '../../assets/loaders/loading.svg';


export default class Callback extends Component {
    constructor() {
        super();
        let _this = this;

        const webAuth = new auth0.WebAuth({
            clientID: APP_CONFIG.auth.clientId,
            domain: APP_CONFIG.auth.clientDomain,
        });


        webAuth.parseHash(window.location.hash, (err, authResult) => {
            let userProfile;
            if (authResult) {
                webAuth.client.userInfo(authResult.accessToken, (error, profile) => {
                    if (error) {
                        console.log('Error loading the profile', error)
                    } else {
                        userProfile = profile;

                        let result = {
                            authResult: authResult,
                            profile: userProfile,
                            type: 'authResult',
                        };
                        parent.postMessage(result, `${window.location.origin}/homepage`);
                    }
                });
            } else if (err) {
                console.log("error parsing authResult hash", err);
                parent.postMessage(err, `${window.location.origin}/homepage`);
            }
        });
    }

    render() {
        const style = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
        }

        return (
            <div style={style}>
                <img src={loading} alt="loading"/>
            </div>
        );
    }
}




// export default () => {
//
//     let _this = this;
//
//     const webAuth =  new auth0.WebAuth({
//         clientID: APP_CONFIG.auth.clientId,
//         domain: APP_CONFIG.auth.clientDomain,
//         responseType: 'token id_token',
//         redirectUri: `${window.location.origin}/`,
//     });
//
//     webAuth.parseHash(window.location.hash, (err, authResult) => {
//       let userProfile;
//       if (authResult) {
//             webAuth.client.userInfo(authResult.accessToken, (error, profile) => {
//                 if (error) {
//                     console.log('Error loading the profile', error)
//                 } else {
//                     userProfile =  profile;
//
//                     let result = {
//                         authResult: authResult,
//                         profile: userProfile,
//                         type: 'authResult',
//                     };
//                     parent.postMessage(result, `${window.location.origin}/homepage`);
//
//
//                 }
//             });
//
//         } else if (err) {
//             console.log("error parsing authResult hash", err);
//           parent.postMessage(err, `${window.location.origin}/homepage`);
//       }
//
//     });
//
//     return null
// }