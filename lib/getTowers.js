var scanner = require('node-wifiscanner');

module.exports = function(cb){
  scanner.scan(function(err, towers){
    if (err) return cb(err);
    cb(null, towers);
  });
};