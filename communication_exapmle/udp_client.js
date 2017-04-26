/**
 * Created by xieganying on 17-4-26.
 */
//udp client

var dgram = require('dgram');
var client = dgram.createSocket('udp4');

process.stdin.resume();

process.stdin.on('data', function (data) {
   console.log(data.toString('utf-8'));
    client.send(data, 0, data.length, 8126, "examples.burningbird.net", function (err, bytes) {
        if(err){
            console.log('error: ' + err);
        }else{
            console.log('successful');
        }
    });
});