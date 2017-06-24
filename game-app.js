const express = require('express');
var app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const fs = require('fs');


app.engine('mustache', mustache() )
app.set('view engine', 'mustache');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

/// <---- Above is app delclarations / Below is my code -------->

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let userGuesses = [];
let wordDash = [];
let userWrongGuesses = [];
let count = 2;
let winArray = [];

function randomNum(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

var theChosenOne = words[randomNum(0, words.length)];
// var theChosenOne = 'look';
console.log(theChosenOne);
let theChosenArray = theChosenOne.split('');
console.log(theChosenArray);
var theChosenArrayMod = theChosenArray;
console.log(theChosenArrayMod);

for(let i = 0; i < theChosenOne.length; i++){
  wordDash.push(' _ ');
}
var dashes = wordDash;

app.get('/', function(req, res){
  res.render('index', {
    title: 'Guess my game',
    theWord: theChosenOne,
    userGuesses: userGuesses,
    dashes: dashes,
    userWrongGuesses: userWrongGuesses,
    count: count,
  });
})

app.post('/', function(req, res){
  var userGuess = req.body.guess;
  console.log('pulling from the html: ' + userGuess);
  console.log('The length of theChosenArray is ' + theChosenArray.length);

  if(theChosenArray.indexOf(userGuess) !== -1){

    console.log('The value of winArray is ' + winArray);
    for(let i = 0; i < theChosenArray.length; i++){
      if(theChosenArray[i] === userGuess){
        dashes.splice(i, 1, userGuess);
        winArray.push(userGuess);
      }
    }
  }else{
      userWrongGuesses.push(userGuess);
      count--;
    }

  if(count === 0){
    res.redirect('/lost'); // FIXME: This is giving me a headers error
  }
  if(winArray.length === theChosenArray.length){
    res.redirect('/win')// FIXME: This is giving me a headers error
  }
  userGuesses.push(userGuess);
  res.redirect('/');
})

app.get('/lost', function(req, res){
  res.render('lost')
})

app.get('/win', function(req, res){
  res.render('win');
})

app.listen(3000, function(){
  console.log('Let\'s guess some words!!');
});
