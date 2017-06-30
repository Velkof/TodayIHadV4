const router = require('express').Router();

router.use('/foods', require('./foods'));
router.use('/users', require('./users'));

router.get('/', function (req, res) {
    res.render('home');
});

// router.get('*', function (req, res) {
//     res.render('home');
// });

router.use(function(err, req, res, next){
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key){
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }

    return next(err);
});

module.exports = router;