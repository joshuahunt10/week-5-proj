const express = require('express');
var app = express();
const router = express.Router();
const randomWord = require('../models/randomWord');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const parseGuess = require('../models/parseGuess');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(expressValidator());

let userGuesses = [];

let attemptsAllowed = 8

router.get('/', function(req, res){
  res.render('index', {
    title: 'Guess my game',
    theWord: randomWord.generatedWord,
    userGuesses: userGuesses,
    dashes: randomWord.dashes,
    userWrongGuesses: parseGuess.userWrongGuesses,
    count: attemptsAllowed - parseGuess.userWrongGuesses.length,
  });
})

router.post('/', function(req, res){
  var userGuess = req.body.guess;
  req.checkBody('guess', 'Please enter a guess!').notEmpty();
  req.checkBody('guess', 'You may only enter one letter!').len(0,1);
  req.checkBody('guess', 'You must enter a letter a-z').isAlpha();
  var errors = req.validationErrors();
  if(errors){
    res.render('index', {
      title: 'Guess my game',
      theWord: randomWord.generatedWord,
      userGuesses: userGuesses,
      dashes: randomWord.dashes,
      userWrongGuesses: parseGuess.userWrongGuesses,
      count: attemptsAllowed - parseGuess.userWrongGuesses.length,
      errors: errors,
    });
  }else{
    parseGuess.parseGuess(randomWord.generatedWord, userGuess, parseGuess.count);
    if(parseGuess.userWrongGuesses.length === attemptsAllowed){
      return res.redirect('/lost');
    } else if (parseGuess.winArray.length === randomWord.generatedWordArray.length){
      return res.redirect('/win')
    }else{
      userGuesses.push(userGuess);
      res.render('index', {
        title: 'Guess my game',
        theWord: randomWord.generatedWord,
        userGuesses: userGuesses,
        dashes: randomWord.dashes,
        userWrongGuesses: parseGuess.userWrongGuesses,
        count: attemptsAllowed - parseGuess.userWrongGuesses.length,
      });
    }
  }
})

router.get('/lost', function(req, res){
  res.render('lost')
})

router.get('/win', function(req, res){
  res.render('win');
})

module.exports = router;
