#! /usr/bin/env node
var fs = require('fs');
var prompt = require('prompt');
var q = require('q');

var words = [];

readFileToArray()
  .then(shuffleArray)
  .then(function(arr) { words = arr; });

function readFileToArray() {
  var deferred = q.defer();

  try {
    fs.readFile('enable1.txt', 'utf8', function(err, data) {
      if(err) { deferred.reject(err); }
      else { deferred.resolve(data.replace(/(\r)/gm, '').split('\n')); }
    });
  } catch(err) { deferred.reject(err); }

  return deferred.promise;
}

function shuffleArray(array) {
  var deferred = q.defer();

  try {
    for (var i = array.length -1; i> 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    deferred.resolve(array);
  } catch(err) { deferred.reject(err); }

  return deferred.promise;
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
