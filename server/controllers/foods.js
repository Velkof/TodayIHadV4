/**
 * Created by Marjan on 21-Jun-17.
 */
const router = require('express').Router();
const Food = require('../models/Food');

router.route('/')
    .post(function(req, res) {

        const food = new Food();
        food.name = req.body.name;

        food.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Food created!' });
        });
    }).get(function(req, res) {

        Food.find(function(err, bears) {
            if (err){
                res.send(err);
            }

            res.json(bears);
        });
    });

router.route('/:id')
    .get(function(req, res) {

        Food.findOne({_id: req.params.id}, function (err, food) {

            if (err) {
                res.send(err);
            }

            res.json(food);
        });
    }).put(function(req, res) {

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
    .delete(function(req, res) {

        Food.remove({
            _id: req.params.id
        }, function(err, food) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });

    });


module.exports = router;
