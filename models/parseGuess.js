var theChosenArray = require('./randomWord')
let userWrongGuesses = [];
let count = 2;
let winArray = [];
let dashes = theChosenArray.dashes;

function parseGuess(theChosenArray, userGuess, count){

  if(theChosenArray.indexOf(userGuess) !== -1){
    for(let i = 0; i < theChosenArray.length; i++){
      if(theChosenArray[i] === userGuess){
        dashes.splice(i, 1, userGuess);
        winArray.push(userGuess);
      }
    }
  }else{
      userWrongGuesses.push(userGuess);

    }
}
module.exports = {
  parseGuess: parseGuess,
  count: count,
  winArray: winArray,
  userWrongGuesses: userWrongGuesses
}
