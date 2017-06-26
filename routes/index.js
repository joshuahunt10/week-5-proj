const express = require('express');
var app = express();
const router = express.Router();
const randomWord = require('../models/randomWord');
const bodyParser = require('body-parser');
const parseGuess = require('../models/parseGuess');
app.use(bodyParser.urlencoded({ extended: false }));

let userGuesses = [];

router.get('/', function(req, res){
  res.render('index', {
    title: 'Guess my game',
    theWord: randomWord.generatedWord,
    userGuesses: userGuesses,
    dashes: randomWord.dashes,
    userWrongGuesses: parseGuess.userWrongGuesses,
    count: parseGuess.count,
  });
})

router.post('/', function(req, res){
  var userGuess = req.body.guess;
  parseGuess.parseGuess(randomWord.generatedWord, userGuess, parseGuess.count);

  // winCondition(parseGuess.count, parseGuess.winArray);
  // console.log('the count is', parseGuess.count);
  if(parseGuess.count === 0){
    return res.redirect('/lost');
  } else if (parseGuess.winArray.length === randomWord.generatedWordArray.length){
    return res.redirect('/win')
  }else{
    userGuesses.push(userGuess);
    return res.redirect('/');
  }
})

router.get('/lost', function(req, res){
  res.render('lost')
})

router.get('/win', function(req, res){
  res.render('win');
})

module.exports = router;
