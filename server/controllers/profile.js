const router = require('express').Router();
const auth = require('../boot.js');

console.log("asdsdasadasdasd", auth.authCheck);

router.get('/', function(req, res, next){
    res.json({
        firstName: 'Admin',
        lastName: 'Admin',
    });
});

module.exports = router;