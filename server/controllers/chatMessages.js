/**
 * Created by Marjan on 01-Aug-17.
 */
const router = require('express').Router();
const ChatMessage = require('../models/ChatMessage');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const config = require('../config');
const validator = require('validator');

router.use(cors());

const authCheck = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://marjanian.eu.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: config("auth.clientId"),
    issuer: config("auth.issuer"),
    algorithms: ['RS256']
});

router.route('/')
    .post(authCheck, function(req, res) {

        const chatMessage = new ChatMessage();

        chatMessage.sender = req.body.sender;
        chatMessage.receiver = req.body.receiver;
        chatMessage.message = req.body.message;
        chatMessage.seen = req.body.seen;
        chatMessage.createdAt = new Date();
        chatMessage.updatedAt = new Date();

        chatMessage.save(function(err) {
            if (err)
                res.send(err);
            res.json( chatMessage );
        });

    }).get( function(req, res) {


    if (!req.query.loggedInUser) {
        ChatMessage.find({}, function(err, chatMessages) {
            if (err) {
                res.send(err);
            }

            res.json(chatMessages);
        });
    } else {

        ChatMessage.find({$or:[
            {'sender': req.query.loggedInUser, 'receiver': req.query.otherUser},
            {'sender': req.query.otherUser, 'receiver': req.query.loggedInUser}
        ]}, function(err, chatMessages){
            if (err) {
                res.send(err);
            }
            res.json(chatMessages);
        });

    }

});



// router.route('/:id')
//     .get(authCheck, function(req, res) {
//
//         ChatMessage.findOne({_id: req.params.id}, function (err, chatMessage) {
//
//             if (err) {
//                 res.send(err);
//             }
//
//             res.json(chatMessage);
//         });
//     }).put(authCheck, function(req, res) {
//
//     ChatMessage.findOne({_id: req.params.id}, function (err, chatMessage) {
//
//         if (err) {
//             res.send(err);
//         }
//
//         chatMessage.sender = req.body.sender;
//         chatMessage.receiver = req.body.receiver;
//         chatMessage.message = req.body.message;
//         chatMessage.seen = req.body.seen;
//         chatMessage.updatedAt = new Date();
//
//         chatMessage.save(function(err) {
//             if (err)
//                 res.send(err);
//
//             res.json(chatMessage);
//         });
//     });
// }).delete(authCheck, function(req, res) {
//
//     ChatMessage.remove({
//         _id: req.params.id
//     }, function(err, chatMessage) {
//         if (err) {
//             res.send(err);
//         }
//         res.json({ message: 'Successfully deleted message' });
//     });
//
// });


module.exports = router;