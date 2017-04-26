/**
 * Created by xieganying on 17-4-26.
 */
// http client

var http = require('http');

var options = {
    method: 'GET',
    socketPath: './tcp_server.js',
    path:'./?file=main.txt'
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data', function (chunk) {
        console.log('chunk o\' data: ' + chunk);
    });
});

req.on('error', function(e){
    console.log('problem with request: ' + e.message);
});

req.write('data\n');
req.write('data\n');
req.end();