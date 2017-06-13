
//简单的身份验证系统

//模块依赖
var connect = require('connect');
var users = require('./users');

//实现用户输入
process.stdin.resume();
process.stdin.setEncoding('ascii');

var server = connect();

//添加basicAuth
connect.basicAuth(function(user, pass, fn){
        process.stdin.write('Allow user \033[96m' + user + '\033[39m' + 'with pass \033[90m' + pass + '\033[39m ? [y/n]: ');
        process.stdin.once('data', function(){
            if(data[0] == 'y'){
                fn(null,{username:user});
            }else{
                fn(new Error('Unauthorized'));
            }
        });
});

// //创建服务器
// var server = connect(
//     //引用中间件
//     connect.logger('dev'),
//     connect.bodyParser(),
//     connect.cookieParser(),
//     connect.session({secret:'my app secret'}),
//     //验证身份
//     function(req,res){
//         res.writeHead(200);
//         res.end('Welcome to the protected area, ' + req.remoteUser.username);
//     },
//     //检查用户是否已经登录，如果没有登录，则交给其他中间件处理
//     function(req, res, next ){
//        if('/' == req.url && req.session.logged_in){
//             res.writeHead(200,{'Content-Type':'text/html'});
//             res.end('Welcome back, <b>' + req.session.name + '</b>,' + '<a href="/logout">Logout</a>');
//         }else{
//             next();
//         }
//     },
//     //展示登录表单
//     function(req, res, next ){
//        if('/' == req.url && 'GET' == req.method){
//             res.writeHead(200,{'Content-Type':'text/html'});
//             res.end([
//                 '<form action="login" method="POST">',
//                     '<fieldset>',
//                         '<legend>Please log in</legend>',
//                         '<p>User: <input type="text" name="user"/></p>',
//                         '<p>Password: <input type="password" name="password"/></p>',
//                        ' <button>Submit</button>',
//                    ' </fieldset>',
//                 '</form>'
//             ].join(''));
//         }else{
//             next();
//         }
//     },
//     //检查登录表单的信息是否与用户凭证匹配，匹配则认为登录成功
//     function(req, res, next ){
//        if('/login' == req.url && 'POST' == req.method){
//             res.writeHead(200);
//             if(!users[req.body.user] || req.body.password != users[req.body.user].password){
//                 res.end('Bad username/password');
//             }else{
//                 req.session.logged_in = true;
//                 req.session.name = users[req.body.user].name;
//                 res.end('Authenticated!');
//             }
//         }else{
//             next();
//         }
//     },
//     //退出登录
//     function(req, res, next ){
//        if('/logout' == req.url){
//            req.session.logged_in = false;
//            res.writeHead(200);
//            res.end('Logged out!');
//         }else{
//             next();
//         }
//     }
// );

//监听端口
server.listen(3005);