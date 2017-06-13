
//模块依赖
var http = require('http');
var fs = require('fs');

//创建http服务器
var server = http.createServer(function(req, res){
    //检查请求方法是GET且URL是以/images开始，.jpg结束
    if('GET' == req.method && './images' == req.url.substr(0,7) && '.jpg' == req.url.substr(-4)){
        //检查文件是否存在， __dirname获取当前服务器所在的路径
        fs.stat(__dirname + req.url, function(err, stat){
            if(err || !stat.isFile()){
                res.writeHead(404);
                res.end('Not Found !');
                return;
            }
            serve(__dirname + req.url, 'application/jpg');
        });
    }
    //如果URL为'/'，则响应index.html
    else if('GET' == req.method && '/' == req.url){
        serve(__dirname + '/index.html','text/html');
    }else{
        res.writeHead(404);
        res.end('Not Found !');
    }
    //根据文件路径获取文件内容
    function serve(path, type){
        res.writeHead(200, {'Content-type':type});
        fs.createReadStream(path).pipe(res);
    }
});

//监听端口
server.listen(3000);