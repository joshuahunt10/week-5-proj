const fs = require('fs');

function randomWordGen(){
  const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

  function randomNum(min, max){
    return Math.floor(Math.random() * (max - min) + min);
  }

  var theChosenOne = words[randomNum(0, words.length)];
  console.log(theChosenOne);
  return theChosenOne;
}

var generatedWord = randomWordGen();

function randomWordtoArray(theChosenOne){
  let theChosenArray = theChosenOne.split('');
  return theChosenArray;
}

var generatedWordArray = randomWordtoArray(generatedWord)


var dashes = [];

for(let i = 0; i < generatedWordArray.length; i++){
  dashes.push(' _ ');
}

module.exports = {
  generatedWord: generatedWord,
  generatedWordArray: generatedWordArray,
  dashes: dashes,
}
