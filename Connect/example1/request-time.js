module.exports = function(opts){
    //设置超时时间阈值
    var time = opts.time || 100;
    //返回一个中间件函数，并在指定事件内触发
    return function(req, res, next){
        var timer = setTimeout(function(){
            console.log('\033[90m%s %s\033[39mis taking too long!\033[39m',req.time, req.url);
        },time);
        var end = res.end;
        res.end = function(chunk, encoding){
            res.end =end;
            res.end(chunk, encoding);
            //响应结束时，清除计时器
            clearTimeout(timer);
        };
        //保证其他中间件能够处理请求
        next();
    };
};