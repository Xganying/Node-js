/**
 * Created by xieganying on 17-4-26.
 */
//http server

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var query = require('url').parse(req.url).query;
    console.log(query);
    file = require('querystring').parse(query).file;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    for(var i=0; i<100; i++){
        res.write(i + '\n');
    }
    var data = fs.readFileSync(file, 'utf-8');
    res.write(date);
    res.end();
}).listen(8125);

console.log('listening on port 8125 ...');