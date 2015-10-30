module.exports = new Printer();

function Printer() {
  this.welcome = _welcome;
}

function _welcome() {
  console.log('ROBCO INDUSTRIES (TM) TERMALINK PROTOCOL');
  console.log('ENTER PASSWORD NOW');
  console.log('');
}
