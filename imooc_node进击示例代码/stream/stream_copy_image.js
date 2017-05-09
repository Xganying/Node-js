

//异步实现图片的复制

var fs = require('fs')
var source = fs.readFileSync('./1.jpg')
fs.writeFileSync('1_stream_new.jpg', source)