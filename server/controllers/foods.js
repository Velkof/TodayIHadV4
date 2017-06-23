/**
 * Created by Marjan on 21-Jun-17.
 */
const router = require('express').Router();
const Food = require('../models/Food');

const jwt = require('express-jwt');
const cors = require('cors');


router.use(cors());

const authCheck = jwt({
    secret:  process.env.AUTH0_SECRET,
    audience:  process.env.AUTH0_CLIENT_ID
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
    }).get(authCheck, function(req, res) {

        Food.find(function(err, bears) {
            if (err){
                res.send(err);
            }

            res.json(bears);
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
    })
    .delete(authCheck, function(req, res) {

        Food.remove({
            _id: req.params.id
        }, function(err, food) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });

    });


module.exports = router;
