var wifilocation = require('../');
var should = require('should');
require('mocha');

var towers = [
  { mac: 'bc:ae:c5:c3:dd:56',
    ssid: 'Arconet Camp',
    signal_level: '-75' },

  { mac: '5c:d9:98:5a:93:72',
    ssid: 'Arconet',
    signal_level: '-73' },

  { mac: '1c:af:f7:ce:fb:f9',
    ssid: 'Arconet',
    signal_level: '-62' },

  { mac: '00:24:a5:15:d2:c2',
    ssid: 'Arconet Amphitheatre',
    signal_level: '-69' }
];

var arcosanti = {
  accuracy: 22,
  latitude: 34.3427546,
  longitude: -112.1004261
};

describe('wifi-location', function() {
  describe('getTowers()', function() {
    it('should work', function(done) {
      this.timeout(10000);
      wifilocation.getTowers(function(err, towers){
        should.not.exist(err);
        should.exist(towers);
        done();
      });
    });
  });

  describe('getLocation()', function() {
    it('should work', function(done) {
      this.timeout(10000);
      wifilocation.getLocation(towers, function(err, loc){
        should.not.exist(err);
        should.exist(loc);
        loc.should.eql(arcosanti);
        done();
      });
    });
  });

});
