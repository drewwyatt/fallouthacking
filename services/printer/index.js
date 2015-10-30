var compare = require('../compare');

module.exports = new Printer();

function Printer() {
  this.correct = _correct;
  this.incorrectWithComparison = _incorrectWithComparison;
  this.welcome = _welcome;
  this.wordbank = _wordbank;
}

function _correct(guess) {
  console.log('>' + guess + '...Access granted.');
  console.log('>Welcome.');
}

function _incorrectWithComparison(guess, password) {
  console.log('>' + guess + '...Entry denied.');
  console.log('>' + compare(guess, password) + '/' + guess.length + ' correct.');

  console.log('');
}

function _padding(n) {
  var padding = '';
  for(var i=0; i<n; i++) {
    padding += ' ';
  }

  return padding;
}

function _welcome() {
  console.log('>ROBCO INDUSTRIES (TM) TERMALINK PROTOCOL');
  console.log('>ENTER PASSWORD NOW');
  console.log('');
}

function _wordbank(words) {
  console.log('>OPTIONS');
  console.log('=======================================');
  // words.forEach(function(word) {
  //   console.log('#', word);
  // });

  var padding = _padding(words[0].length);
  for(var i=0; i<words.length; i = i+2) {
    console.log('#', words[i], '||', words[i+1] || padding, '#');
  }

  console.log('=======================================');
}
