
//流事件的使用示例

var fs = require('fs')
var readStream = fs.createReadStream('stream_copy_image.js')
var n = 0

readStream
    .on('data', function(chunk){ //监听数据
        n++
        console.log(Buffer.isBuffer(chunk))
        console.log('event emits')
        // console.log(chunk.toString('utf8'))
        readStream.pause()
        console.log('data pause')
        setTimeout(function(){
            console.log('data pause end')
            readStream.resume()
        }, 3000)
    })
    .on('readable', function(){ //监听可读事件
        console.log('data readable')
    })
    .on('end', function(){ // 事件结束
        console.log(n)
        console.log('data end')
    })
    .on('close', function(){  //关闭事件
        console.log('data close')
    })
    .on('error', function(err){  // 执行出错
        console.log('data read error: ' + err)
    })