module.exports = compare;

function compare(string1, string2) {
  var similarCharacters = 0;
  for (var i=0; i<string1.length; i++) {
    if(string1.charAt(i) === string2.charAt(i)) {
      similarCharacters++;
    }
  }

  return similarCharacters;
}
