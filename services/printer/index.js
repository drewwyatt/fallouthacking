module.exports = new Printer();

function Printer() {
  this.welcome = _welcome;
  this.wordbank = _wordbank;
}

function _welcome() {
  console.log('ROBCO INDUSTRIES (TM) TERMALINK PROTOCOL');
  console.log('ENTER PASSWORD NOW');
  console.log('');
}

function _wordbank(words) {
  console.log('OPTIONS');
  console.log('=======================================');
  words.forEach(function(word) {
    console.log('#', word);
  });
  console.log('=======================================');
}
