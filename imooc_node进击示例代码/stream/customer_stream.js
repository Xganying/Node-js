
//用户自己定制的可读流，可写流和转换流，并实现内置接口

var stream = require('stream')
var util = require('util')

//定制可读流
function ReadStream(){
    stream.Readable.call(this) //改变上下文
}

//让声明的可读流继承流里面可读的原型
util.inherits(ReadStream, stream.Readable)

//可读流,只做一件事，就是往里面存数据
ReadStream.prototype._read = function(){  //因为是室友方法，所以read 为 _read
    this.push('I ')
    this.push('Love ')
    this.push('Font-End\n')
    this.push(null) 
}

//定制可写流
function WritStream(){
    stream.Writable.call(this)
    this._cached = Buffer('') //设置一个缓存
}

util.inherits(WritStream, stream.Writable)

//可写流，只做一件事，就是打印数据
WritStream.prototype._write = function(chunk, encode, cb){
    console.log(chunk.toString())
    cb()
}

// 定制转换流
function TransformStream(){
    stream.Transform.call(this)
}

util.inherits(TransformStream, stream.Transform)

//转换流，只做一件事，加工数据
TransformStream.prototype._transform = function(chunk, encode, cb){
    this.push(chunk)
    cb()
}

//转换流的用途：写一些Gulp或Grunt插件时，可以给一些文件添加后缀，前缀，给一些字符串替换之类的，
//但是自己本省并不保存数据，只是处理刘晶它的数据
TransformStream.prototype._flush = function(cb){
    this.push('On Yeah !')  //添加额外的内容
    cb()
}

//创建实例
var rs= new ReadStream()
var ws = new WritStream()
var ts = new TransformStream()

rs.pipe(ts).pipe(ws)