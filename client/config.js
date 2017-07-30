const dotenv = require('dotenv');
const path = require('path');
const _ = require('underscore');

dotenv.config({path: path.join(__dirname, '.env')});

const configs = require('./config/index');

console.log(":configs", configs)

module.exports = (key, defaultValue) => {

    if(typeof defaultValue === 'undefined') {
        defaultValue = null;
    }

    const segments = key.split('.');

    let result = configs || {};

    for(let i = 0; i < segments.length; i++) {

        if(!_.has(result, segments[i])){
            result = {};
            break;
        }

        result = result[segments[i]];
    }

    return (typeof result !== 'object' && result !== defaultValue) || (typeof result === 'object' && !_.isEmpty(result)) ? result : defaultValue;
};
