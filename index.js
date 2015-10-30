#! /usr/bin/env node
var prompt = require('prompt');
var q = require('q');

var print = require('./services/printer');
var words = require('./services/wordservice');

var choices = [];
var guesses = [];
var password = null;
var wordOptions = { length: 5, count: 5 };

print.welcome();
initialize()
  .then(_showWordBank)
  .then(_promptForGuesses);


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

function _showWordBank() {
  var deferred = q.defer();

  print.wordbank(choices);

  deferred.resolve();
  return deferred.promise;
}

function _promptForGuesses(deferred) {
  deferred = (deferred === undefined) ? q.defer() : deferred;

  prompt.start();
  prompt.get('guess', function(err, response) {
    var guess = response.guess.toUpperCase();
    guesses.push(guess);
    if(guess === password) {
      deferred.resolve();
    }  else {
      print.incorrectWithComparison(guess, password);
      _promptForGuesses(deferred);
    }
  });

  return deferred.promise;
}
