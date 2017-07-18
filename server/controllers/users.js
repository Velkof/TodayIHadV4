/**
 * Created by Marjan on 26-Jun-17.
 */
const router = require('express').Router();
const User = require('../models/User');

const jwt = require('express-jwt');
const cors = require('cors');
const config = require('../config');

router.use(cors());

const authCheck = jwt({
    secret:  config("auth.clientSecret"),
    audience:  config("auth.clientId")
});

router.route('/')
    .post( function(req, res) {

        User.findOne({email:req.body.email}, function (err, user) {

                if (err) {
                   console.log("error", err);
                }
                if(user === null) {
                    const user = new User();
                    user.name = req.body.name;
                    user.email = req.body.email;
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

        User.find(function(err, users) {
            if (err){
                res.send(err);
            }

            res.json(users);
        });
});

router.route('/:id')
    .get(authCheck, function(req, res) {

        User.findOne({_id: req.params.id}, function (err, user) {

            if (err) {
                res.send(err);
            }

            res.json(user);
        });
    }).put(authCheck, function(req, res) {

        User.findOne({_id: req.params.id}, function (err, user) {

            if (err) {
                res.send(err);
            }

            user.name = req.body.name;
            user.email = req.body.email;
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