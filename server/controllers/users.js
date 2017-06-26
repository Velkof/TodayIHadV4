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

        let userExists = User.findOne({email:req.body.email}, {});

        if(!userExists) {
            const user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'User created!' });
            });
        }

        // User.findAndModify({
        //     query: { email: req.body.email },
        //     update: {
        //         $setOnInsert: { name: req.body.name, email: req.body.email }
        //     },
        //     new: true,   // return new doc if one is upserted
        //     upsert: true // insert the document if it does not exist
        // });


    }).get(authCheck, function(req, res) {

        User.find(function(err, users) {
            if (err){
                res.send(err);
            }

            res.json(users);
        });
});

module.exports = router;