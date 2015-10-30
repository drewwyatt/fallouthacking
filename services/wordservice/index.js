var fs = require('fs');
var q = require('q');

module.exports = new Words();

function Words() {
  this.get = function(options, cb) {
    this.readFileToArray(options)
      .then(this.shuffleArray.bind(this))
      .then(this.filter.bind(this))
      .then(function(w) {
        cb(w);
      })
      .catch(function(e) {
        cb(null, e);
      });
  }

  this.filter = function(args) {
    var deferred = q.defer();

    var count = 0;
    var filtered = args.array.filter(function(w) {
      if(w.length === args.length && count <= args.count) {
        count++;
        return true;
      }
    });
    deferred.resolve(filtered);

    return deferred.promise;
  };

  this.readFileToArray = function(args) {
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

  this.shuffleArray = function(args) {
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

}
