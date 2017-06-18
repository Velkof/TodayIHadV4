const _ = require('underscore');

const configs = require('./config/index');

console.log(configs);

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