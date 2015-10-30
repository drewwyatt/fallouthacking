#! /usr/bin/env node
var prompt = require('prompt');
var q = require('q');

var print = require('./services/printer');
var words = require('./services/wordservice');

var choices = [];
var answer = null;
var wordOptions = { length: 5, count: 5 };

print.welcome();

words.get(wordOptions, function(words) {
  choices = words;
  secret = choices[Math.floor(Math.random() * choices.length)];

  print.wordbank(choices);
});



// var answer = 'awesome';
// var guesses = [];
// function promptForGuess(deferred) {
//   deferred = (deferred === undefined) ? q.defer() : deferred;
//
//   prompt.start();
//   prompt.get('guess', function(err, response) {
//     guesses.push(response.guess);
//     if(response.guess === answer) {
//       deferred.resolve();
//     }  else {
//       promptForGuess(deferred);
//     }
//   });
//
//   return deferred.promise;
// }
//
// promptForGuess().then(function() { console.log('Done!', guesses); });
