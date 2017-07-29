/**
 * Created by Marjan on 21-Jun-17.
 */
const router = require('express').Router();
const Food = require('../models/Food');

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

        const food = new Food();
        food.name = req.body.name;
        food.amount = req.body.amount;
        food.unit = req.body.unit;
        food.units = req.body.units;
        food.ingredients = req.body.ingredients;
        food.type = req.body.type;
        food.calories = req.body.calories;
        food.protein = req.body.protein;
        food.fat = req.body.fat;
        food.carbs = req.body.carbs;
        food.sugar = req.body.sugar;
        food.fiber = req.body.fiber;
        food.fatSat = req.body.fatSat;
        food.fatMono = req.body.fatMono;
        food.fatPoly = req.body.fatPoly;
        food.sodium = req.body.sodium;
        food.cholesterol = req.body.cholesterol;
        food.createdAt = new Date();
        food.updatedAt = new Date();

        food.save(function(err) {
            if (err)
                res.send(err);
            res.json( food );
        });

    }).get(authCheck, function(req, res) {

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
            food.amount = req.body.amount;
            food.unit = req.body.unit;
            food.units = req.body.units;
            food.ingredients = req.body.ingredients;
            food.type = req.body.type;
            food.calories = req.body.calories;
            food.protein = req.body.protein;
            food.fat = req.body.fat;
            food.carbs = req.body.carbs;
            food.sugar = req.body.sugar;
            food.fiber = req.body.fiber;
            food.fatSat = req.body.fatSat;
            food.fatMono = req.body.fatMono;
            food.fatPoly = req.body.fatPoly;
            food.sodium = req.body.sodium;
            food.cholesterol = req.body.cholesterol;
            food.updatedAt = new Date();

            food.save(function(err) {
                if (err)
                    res.send(err);

                res.json(food);
            });
        });
    }).delete(authCheck, function(req, res) {

        Food.remove({
            _id: req.params.id
        }, function(err, food) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });

    });


module.exports = router;