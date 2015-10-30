var compare = require('../compare');

module.exports = new Printer();

function Printer() {
  this.welcome = _welcome;
  this.incorrectWithComparison = _incorrectWithComparison;
  this.wordbank = _wordbank;
}

function _welcome() {
  console.log('>ROBCO INDUSTRIES (TM) TERMALINK PROTOCOL');
  console.log('>ENTER PASSWORD NOW');
  console.log('');
}

function _incorrectWithComparison(guess, password) {
  console.log('>' + guess + '....Entry denied.');
  console.log('>' + compare(guess, password) + '/' + guess.length + ' correct.');

  console.log('');
}

function _wordbank(words) {
  console.log('>OPTIONS');
  console.log('=======================================');
  words.forEach(function(word) {
    console.log('#', word);
  });
  console.log('=======================================');
}
