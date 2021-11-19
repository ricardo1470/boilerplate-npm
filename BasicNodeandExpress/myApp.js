var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require("body-parser");

console.log("Hello World")
absolutePath = (__dirname + '/views/index.html');

function getTime() {
    return new Date().toString();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip)
    next();
});

app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

app.get('/json', (req, res) => {
    const mySecret = process.env['MESSAGE_STYLE']
    var jsonMessage = { "message": "Hello json" }

    if (mySecret === 'uppercase') {
        jsonMessage.message = jsonMessage.message.toUpperCase();
    }
    res.json(jsonMessage)
});

app.get('/now', (req, res, next )=> {
    req.time = getTime();
    next();
}, (req, res) => {
    res.json({ time: req.time });
});

app.get('/:word/echo', (req, res, next) => {
    res.json({ echo: req.params.word });
    next();
});

app.get('/name', (req, res, next) => {
    var firstName = req.query.first;
    var lastName = req.query.last;

    var { first: firstName, last: lastName } = req.query;

    res.json({ name: `${firstName} ${lastName}` });
    next();
});


app.post('/name', (req, res, next) => {
    var firstName = req.query.first;
    var lastName = req.query.last;

    var { first: firstName, last: lastName } = req.body;

    res.json({ name: `${firstName} ${lastName}` });
    next();
});


































module.exports = app;
