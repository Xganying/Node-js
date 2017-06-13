
//简单的登录系统

//模块依赖
var connect = require('connect');
var users = require('./users');

//引入connect-redis模块
var RedisStore = require('connect-redis')(connect);

//创建服务器
var server = connect(
    //引用中间件
    connect.logger('dev'),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({secret:'my app secret'}),
    //检查用户是否已经登录，如果没有登录，则交给其他中间件处理
    function(req, res, next ){
       if('/' == req.url && req.session.logged_in){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('Welcome back, <b>' + req.session.name + '</b>,' + '<a href="/logout">Logout</a>');
        }else{
            next();
        }
    },
    //展示登录表单
    function(req, res, next ){
       if('/' == req.url && 'GET' == req.method){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end([
                '<form action="login" method="POST">',
                    '<fieldset>',
                        '<legend>Please log in</legend>',
                        '<p>User: <input type="text" name="user"/></p>',
                        '<p>Password: <input type="password" name="password"/></p>',
                       ' <button>Submit</button>',
                   ' </fieldset>',
                '</form>'
            ].join(''));
        }else{
            next();
        }
    },
    //检查登录表单的信息是否与用户凭证匹配，匹配则认为登录成功
    function(req, res, next ){
       if('/login' == req.url && 'POST' == req.method){
            res.writeHead(200);
            if(!users[req.body.user] || req.body.password != users[req.body.user].password){
                res.end('Bad username/password');
            }else{
                req.session.logged_in = true;
                req.session.name = users[req.body.user].name;
                res.end('Authenticated!');
            }
        }else{
            next();
        }
    },
    //退出登录
    function(req, res, next ){
       if('/logout' == req.url){
           req.session.logged_in = false;
           res.writeHead(200);
           res.end('Logged out!');
        }else{
            next();
        }
    }
);

server.use(connect.session({store:new RediaStore, secret:'my secret' }));

//监听端口
server.listen(3004);