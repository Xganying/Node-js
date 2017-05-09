
//重构图片复制的代码

var fs = require('fs')
var readStream = fs.createReadStream('1.jpg')
var writeStream = fs.createWriteStream('1_stream.jpg')

readStream.on('data', function(chunk){
    if(writeStream.write(chunk) == false){
        console.log('still cached')
        readStream.pause()
    }
})

readStream.on('end', function(){
    writeStream.end()
})

writeStream.on('drain', function(){
    console.log('data drains')
    readStream.resume()
})


// 对比：更简单的重构，使用管道
// var fs = require('fs')

// fs.createReadStream('1.jpg').pipe(fs.createWriteStream('1_pipe.jpg'))