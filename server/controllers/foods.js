/**
 * Created by Marjan on 21-Jun-17.
 */
const router = require('express').Router();
const Food = require('../models/Food');

const jwt = require('express-jwt');
const cors = require('cors');
const config = require('../config');

router.use(cors());

const authCheck = jwt({
    secret:  config("auth.clientSecret"),
    audience:  config("auth.clientId")
});


router.route('/')
    .post(authCheck, function(req, res) {

        const food = new Food();
        food.name = req.body.name;

        food.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Food created!' });
        });

    }).get( function(req, res) {

        Food.find({}, function(err, foods) {
            if (err){
                res.send(err);
            }

            res.json(foods);
        });
    });

router.route('/:id')
    .get(authCheck, function(req, res) {

        Food.findOne({_id: req.params.id}, function (err, food) {

            if (err) {
                res.send(err);
            }

            res.json(food);
        });
    }).put(authCheck, function(req, res) {

        Food.findOne({_id: req.params.id}, function (err, food) {

            if (err) {
                res.send(err);
            }

            food.name = req.body.name;

            food.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Food updated!' });
            });
        });
    }).delete(authCheck, function(req, res) {

        Food.remove({
            _id: req.params.id
        }, function(err, food) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });

    });


module.exports = router;