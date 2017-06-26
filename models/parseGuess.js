var theChosenArray = require('./randomWord')


//how to get the userGuess in here.

let userWrongGuesses = [];
let count = 2;
let winArray = [];
let dashes = theChosenArray.dashes;

function parseGuess(theChosenArray, userGuess, count){

  if(theChosenArray.indexOf(userGuess) !== -1){
    console.log('The value of winArray is ' + winArray);
    for(let i = 0; i < theChosenArray.length; i++){
      if(theChosenArray[i] === userGuess){
        dashes.splice(i, 1, userGuess);
        winArray.push(userGuess);
        console.log('pushed to the winArray', winArray);
      }
    }
  }else{
      console.log('taking away from count');
      count--;
      userWrongGuesses.push(userGuess);
      console.log('i am in the else taking away from count');
      console.log('the count is now', count);
      return count;

    }
}

// function winCondition(count, winArray){
//   if(count === 0){
//     return res.redirect('/lost');
//   } else if (winArray.length === theChosenArray.length){
//     return res.redirect('/win')
//
//   }else{
//     userGuesses.push(userGuess);
//     res.redirect('/');
//   }
// }

module.exports = {
  parseGuess: parseGuess,
  count: count,
  winArray: winArray,
  userWrongGuesses: userWrongGuesses
}
