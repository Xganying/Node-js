
//实现可读，可写流

var Readable = require('stream').Readable
var Writable = require('stream').Writable

// 创建实例
var readStream = new Readable()
var writStream = new Writable()

//向可读流中存入数据
readStream.push('I ')
readStream.push('Love ')
readStream.push('Font-End\n')
readStream.push(null) //存入完毕

//可写流，打印可读流中存入的内容
writStream._write= function(chunk, encode, cb){
    console.log(chunk.toString())
    cb()
}

//将可读流和可写流连接起来
readStream.pipe(writStream)