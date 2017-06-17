const router = require('express').Router();

router.get('/', function(req, res, next){
    res.json({test: 'test'});
});

router.get('/vlado', function(req, res, next){
    res.json({test: 'test'});
});

module.exports = router;