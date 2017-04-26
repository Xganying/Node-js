/**
 * Created by xieganying on 17-4-26.
 */

//tcp server

var net = require('net');

var server = net.createServer(function (conn) {
    console.log('**********connected************');
    conn.on('data', function (data) {
        console.log(data + 'from' + conn.remoteAddress + ' ' + conn.reomtePort);
        console.log('************Repeating***********\n' + data);
    });
    conn.on('close', function () {
        console.log('client closed connection .');
    });
}).listen(8124);

console.log('listening on port 8124 ...');