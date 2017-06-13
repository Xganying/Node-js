
//模块依赖
var connect = require('connect');

//创建服务器
//var server = connect.createServer();

//创建服务器
var server = connect.createServer(
    //使用dev日志格式
    //connect.logger('dev'),

    //只记录请求方法和IP地址
    //connect.logger(':method: remote-addr'),

    //记录响应的content-length和content-type信息
    connect.logger('type is : res[content-type], length is ' + ' :res[content-length] and it took :response-time ms. '),
    
    function(req, res){
        res.writeHead(200);
        res.end("Hello, this is example2");
    }
);

//监听端口
server.listen(3002);