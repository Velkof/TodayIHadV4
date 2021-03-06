const config = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const util = require('util');
const PrettyError = require('pretty-error');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const exphbs = require('express-handlebars');
const path = require('path');
const controllers = require('./controllers');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (client) => {
    // here you can start emitting events to the client
    client.on('subscribe', function(data) { client.join(data.room); });

    client.on('unsubscribe', function(data) { client.leave(data.room); });

    client.on('message', function(message) {
        io.in('facebook|897985693710765facebook|100797550626633').emit('message', message);
    });
});

const pe = new PrettyError();
pe.start();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', controllers);

app.get('*', function (req, res) {
    res.render('home');
});

const hbs = exphbs.create({
    layoutsDir: __dirname + '/views/layouts'
});

const models_path = __dirname + '/models';

fs.readdirSync(models_path).forEach(function (file) {
    require(models_path+'/'+file);
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

mongoose.connect(util.format('mongodb://%s/%s', config('database.host'), config('database.name')));

if(!config('app.isProduction')) {
    mongoose.set('debug', true);
    app.use(errorhandler());
}

if(config('app.port')) {

    server.listen(config('app.port'), (err) => {
        if (err) {
            console.error(err);
        }
        console.info('----\n==> Server is running on port %s', config('app.port'));
        console.info('==> Send requests to http://%s:%s', config('app.host'), config('app.port'));
    });

} else {
    console.error('==> ERROR: No PORT environment variable has been specified');
}

