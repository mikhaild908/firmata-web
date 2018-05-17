const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app'); // to use this - on the command line: DEBUG=app node app.js
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const nav = [ { link: '/light', title: 'Light' } ];

app.use(morgan('tiny')); 
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('src/views'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const applianceRouter = require('./src/routes/onOffRoutes')(nav);
app.use('/switch', applianceRouter);

app.get('/', function(req, res){
    //res.sendFile(path.join(__dirname, 'views/index.html'));
    res.render('index', { nav, title: 'Firmata Web' });
});

app.listen(port, function(err){
    //console.log(`running server on port ${chalk.green(port)}`);
    debug(`running server on port ${chalk.green(port)}`);
});