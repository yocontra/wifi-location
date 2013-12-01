var request = require('request');

/*

Method one:

POST https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw

Content-Type: application/json

{
  "wifiAccessPoints": [{
    "age": 0,
    "channel": 1,
    "macAddress": "5c-d9-98-5a-93-72",
    "signalStrength": -68,
    "signalToNoiseRatio": 20
  }, {
    "age": 0,
    "channel": 6,
    "macAddress": "00-24-a5-15-d2-c2",
    "signalStrength": -69,
    "signalToNoiseRatio": 21
  }, {
    "age": 0,
    "channel": 11,
    "macAddress": "1c-af-f7-ce-fb-f9",
    "signalStrength": -82,
    "signalToNoiseRatio": 6
  }]
}

Response:
{
  "location": {
    "lat": 34.3427393,
    "lng": -112.1003994
  },
  "accuracy": 23.0
}
*/

/*
 Method two:

 POST https://maps.googleapis.com/maps/api/browserlocation/json?browser=firefox&sensor=true

*/

module.exports = function(towers, cb){
  var opt = {
    method: 'POST',
    url: "https://maps.googleapis.com/maps/api/browserlocation/json",
    json: true
  };

  // bullshit hack for googles nonstandard qs parsing
  opt.url += "?browser=firefox&sensor=true&wifi=";
  opt.url += towers.map(function(tower){
    var out = [];
    out.push("mac:"+tower.mac);
    out.push("ssid:"+tower.ssid);
    out.push("ss:"+tower.signal_level);
    return out.join('|');
  }).join("&wifi=");

  request(opt, function(err, res, body){
    if (err) return cb(err);
    if (!body) return cb(new Error('No response'));
    if (!body.location) return cb();

    cb(null, {
      accuracy: body.accuracy,
      latitude: body.location.lat,
      longitude: body.location.lng
    });
  });
};