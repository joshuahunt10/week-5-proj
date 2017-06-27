const express = require('express');
var app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const fs = require('fs');
const parseGuess = require('./models/parseGuess')
const randomWord = require('./models/randomWord')


app.engine('mustache', mustache() )
app.set('view engine', 'mustache');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

const indexRoutes = require('./routes/index')
app.use('/', indexRoutes);


app.listen(3000, function(){
  console.log('Let\'s guess some words!!');
});
