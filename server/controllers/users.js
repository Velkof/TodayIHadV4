/**
 * Created by Marjan on 26-Jun-17.
 */
const router = require('express').Router();
const User = require('../models/User');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const config = require('../config');

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

        User.findOne({user_id:req.body.user_id}, function (err, result) {

                if (err) {
                   console.log("error", err);
                }
                if(result === null) {
                    const user = new User();
                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.picture = req.body.picture;
                    user.picture_large = req.body.picture_large;
                    user.user_id = req.body.user_id;
                    user.followingUsers = [];
                    user.followedByUsers = [];
                    user.role = "user";
                    user.createdAt = new Date();
                    user.updatedAt = new Date();

                    user.save(function(err) {
                        if (err)
                            res.send(err);
                        res.json({ message: 'User created!' });
                    });
                }
            });

    }).get(authCheck, function(req, res) {

        if (req.query.loggedInUserId) {
            //all users except logged in user
            User.find({
                user_id: {$nin: req.query.loggedInUserId}
            }, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        } else if (req.query.email){
            //get user by email
            User.findOne({email: req.query.email}, function (err, user) {

                if (err) {
                    res.send(err);
                }

                res.json(user);
            });
        } else if (req.query.user_id){
            //only loggedInUser
            User.findOne({user_id: req.query.user_id}, function (err, user) {

                if (err) {
                    res.send(err);
                }

                res.json(user);
            });
        } else if (req.query.followedUsers){
            //fetch followed users
            User.find({user_id: { $in:  req.query.followedUsers}}, function (err, user) {

                if (err) {
                    res.send(err);
                }

                res.json(user);
            });
        } else{
            //get all users
            User.find(function(err, users) {
                if (err){
                    res.send(err);
                }
                res.json(users);
            });
        }
});


router.route('/:id')
    // .get(authCheck, function(req, res) {
    //
    //     User.findOne({_id: req.params.id}, function (err, user) {
    //
    //         if (err) {
    //             res.send(err);
    //         }
    //
    //         res.json(user);
    //     });
    // })
.put(authCheck, function(req, res) {

        User.findOne({user_id: req.params.id}, function (err, user) {

            if (err) {
                res.send(err);
            }

            user.name = req.body.name;
            user.email = req.body.email;
            user.picture = req.body.picture;
            user.picture_large = req.body.picture_large;
            user.followingUsers = req.body.followingUsers;
            user.followedByUsers = req.body.followedByUsers;
            user.role = req.body.role;
            user.updatedAt = new Date();

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json(user);
            });
        });

    }).delete(authCheck, function(req, res) {

        User.remove({
            _id: req.params.id
        }, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;