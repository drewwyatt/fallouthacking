#! /usr/bin/env node
var prompt = require('prompt');
var q = require('q');
// console.log(process.argv);

var answer = 'awesome';
var guesses = [];
function promptForGuess(deferred) {
  deferred = (deferred === undefined) ? q.defer() : deferred;

  prompt.start();
  prompt.get('guess', function(err, response) {
    guesses.push(response.guess);
    if(response.guess === answer) {
      deferred.resolve();
    }  else {
      promptForGuess(deferred);
    }
  });

  return deferred.promise;
}

promptForGuess().then(function() { console.log('Done!', guesses); });
