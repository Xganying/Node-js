
//模块依赖
var connect = require('connect');

//创建服务器
var server = connect(
    connect.bodyParser(),
    connect.static('static'),
    
    function(req, res, next ){
        if('POST' == req.method && req.body.file){
            //添加中间件，查看reqbody.file的值
            //console.log(req.body.file);
            fs.readFile(req.body.file.path, 'utf-8', function(err, data){
                if(err){
                    res.writeHead(500);
                    res.end('Error!');
                    return;
                }
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end([
                    '<h3>File: ' + req.body.file.name + '</h3>',
                    '<h4>Type: ' + req.body.file.type + '</h4>',
                    '<h4>Content:</h4><pre>' + data + '</pre>'
                ].join(''));
            });
        }else{
            next();
        }
    }
);


//监听端口
server.listen(3003);