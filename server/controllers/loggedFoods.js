/**
 * Created by Marjan on 19-Jul-17.
 */
const router = require('express').Router();
const LoggedFood = require('../models/LoggedFood');

const jwt = require('express-jwt');
const cors = require('cors');
const config = require('../config');
const validator = require('validator');


router.use(cors());


const authCheck = jwt({
    secret:  config("auth.clientSecret"),
    audience:  config("auth.clientId")
});


router.route('/')
    .post(authCheck, function(req, res) {

        const loggedFood = new LoggedFood();
        loggedFood.name = req.body.name;
        loggedFood.amount = req.body.amount;
        loggedFood.unit = req.body.unit;
        loggedFood.units = req.body.units;
        loggedFood.calories = req.body.calories;
        loggedFood.protein = req.body.protein;
        loggedFood.fat = req.body.fat;
        loggedFood.carbs = req.body.carbs;
        loggedFood.sugar = req.body.sugar;
        loggedFood.fiber = req.body.fiber;
        loggedFood.fatSat = req.body.fatSat;
        loggedFood.fatMono = req.body.fatMono;
        loggedFood.fatPoly = req.body.fatPoly;
        loggedFood.sodium = req.body.sodium;
        loggedFood.cholesterol = req.body.cholesterol;
        loggedFood.createdAt = new Date();
        loggedFood.updatedAt = new Date();

        loggedFood.save(function(err) {
            if (err)
                res.send(err);
            res.json( loggedFood );
        });

    }).get(authCheck, function(req, res) {

    LoggedFood.find({}, function(err, loggedFoods) {
        if (err){
            res.send(err);
        }

        res.json(loggedFoods);
    });
});

router.route('/:id')
    .get(authCheck, function(req, res) {

    LoggedFood.findOne({_id: req.params.id}, function (err, loggedFood) {

            if (err) {
                res.send(err);
            }

            res.json(loggedFood);
        });
    }).put(authCheck, function(req, res) {

    LoggedFood.findOne({_id: req.params.id}, function (err, loggedFood) {

        if (err) {
            res.send(err);
        }

        loggedFood.name = req.body.name;
        loggedFood.amount = req.body.amount;
        loggedFood.unit = req.body.unit;
        loggedFood.units = req.body.units;
        loggedFood.calories = req.body.calories;
        loggedFood.protein = req.body.protein;
        loggedFood.fat = req.body.fat;
        loggedFood.carbs = req.body.carbs;
        loggedFood.sugar = req.body.sugar;
        loggedFood.fiber = req.body.fiber;
        loggedFood.fatSat = req.body.fatSat;
        loggedFood.fatMono = req.body.fatMono;
        loggedFood.fatPoly = req.body.fatPoly;
        loggedFood.sodium = req.body.sodium;
        loggedFood.cholesterol = req.body.cholesterol;
        loggedFood.updatedAt = new Date();

        loggedFood.save(function(err) {
            if (err)
                res.send(err);

            res.json(loggedFood);
        });
    });
}).delete(authCheck, function(req, res) {

    LoggedFood.remove({
            _id: req.params.id
        }, function(err, loggedFood) {
            if (err) {
                res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });

});

module.exports = router;