var fs = require('fs');
var q = require('q');

module.exports = new WordService();

/**
 * Expected Options
 * ------------------------------------->
 * { length: Number, count: Number }
 */

function WordService() {
  this.get = _get;

  this._filter = _filter;
  this._readFileToArray = _readFileToArray;
  this._shuffleArray = _shuffleArray;
  this._upperCase = _upperCase;
}

function _get(options, cb) {
  this._readFileToArray(options)
    .then(this._shuffleArray)
    .then(this._filter)
    .then(this._upperCase)
    .then(function(w) {
      cb(w.array);
    })
    .catch(function(e) {
      cb(null, e);
    });
}

function _filter(args) {
  var deferred = q.defer();

  var count = 0;
  var filtered = args.array.filter(function(w) {
    if (w.length === args.length && count <= args.count) {
      count++;
      return true;
    }
  });
  args.array = filtered;
  deferred.resolve(args);

  return deferred.promise;
}

function _readFileToArray(args) {
  var deferred = q.defer();

  try {
    fs.readFile('enable1.txt', 'utf8', function(err, data) {
      if (err) {
        deferred.reject(err);
      } else {
        args.array = data.replace(/(\r)/gm, '').split('\n');
        deferred.resolve(args);
      }
    });
  } catch (err) {
    deferred.reject(err);
  }

  return deferred.promise;
}

function _shuffleArray(args) {
  var deferred = q.defer();

  try {
    for (var i = args.array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = args.array[i];
      args.array[i] = args.array[j];
      args.array[j] = temp;
    }

    deferred.resolve(args);
  } catch (err) {
    deferred.reject(err);
  }

  return deferred.promise;
}

function _upperCase(args) {
  var deferred = q.defer();

  for (var i = 0; i < args.array.length; i++) {
    args.array[i] = args.array[i].toUpperCase();
  }

  deferred.resolve(args);
  return deferred.promise;
}
