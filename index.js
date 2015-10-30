#! /usr/bin/env node
var prompt = require('prompt');
var q = require('q');

var print = require('./services/printer');
var words = require('./services/wordservice');

var choices = [];
var password = null;
var wordOptions = { length: 5, count: 5 };

print.welcome();
initialize()
  .then(function() { print.wordbank(choices); });


function initialize() {
  var getWords = q.defer();

  _getWordsAndPassword(function() { getWords.resolve(); });

  return q.all([getWords.promise]);
}

function _getWordsAndPassword(cb) {
  words.get(wordOptions, function(words) {
    choices = words;
    password = choices[Math.floor(Math.random() * choices.length)];
    cb();
  });
}

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
