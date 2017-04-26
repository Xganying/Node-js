/**
 * Created by xieganying on 17-4-26.
 */
//udp server

var dgram = require('dgram');
var server = dgram.createSocket("udp4");

server.on("message", function (msg, rinfo) {
    console.log("Message: " + msg + "from " + rinfo.address + " : " + rinfo.port);
});

server.bind(8126);