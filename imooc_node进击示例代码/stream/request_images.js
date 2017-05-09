
//获取图片 

var http = require('http')
var fs = require('fs')
var request = require('request')

http
.createServer(function(req,res){

    // fs.readFile('./1.jpg', function(err, data){
    //     if(err){
    //         console.log('readFile error : ' + err )
    //     }else{
    //         res.writeHeader(200, {'Content-Type': 'text/html'})
    //         res.end(data)
    //     }
    // })

    // fs.createReadStream('./1.jpg').pipe(res) //本地图片
    request('http://www.imooc.com/static/img/index/logo.png').pipe(res) //非本地图片
})
.listen(8092)