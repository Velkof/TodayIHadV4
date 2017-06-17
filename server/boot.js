const config = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const util = require('util');
const PrettyError = require('pretty-error');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const exphbs = require('express-handlebars');
const path = require('path');

const pe = new PrettyError();
pe.start();

const app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));

const hbs = exphbs.create({
    layoutsDir: __dirname + '/views/layouts'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(require('./controllers'));

mongoose.connect(util.format('mongodb://%s/%s', config('database.host'), config('database.name')));

if(!config('app.isProduction')) {
    mongoose.set('debug', true);
    app.use(errorhandler());
}

if(config('app.port')) {

    app.listen(config('app.port'), (err) => {
        if (err) {
            console.error(err);
        }
        console.info('----\n==> Server is running on port %s', config('app.port'));
        console.info('==> Send requests to http://%s:%s', config('app.host'), config('app.port'));
    });

} else {
    console.error('==> ERROR: No PORT environment variable has been specified');
}