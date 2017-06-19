const router = require('express').Router();

router.get('/', function(req, res, next){
    res.json({
        firstName: 'Admin',
        lastName: 'Admin',
    });
});

module.exports = router;