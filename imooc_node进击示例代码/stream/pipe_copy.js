//使用管道(pipe)实现图片的复制

var fs = require('fs')

fs.createReadStream('1.jpg').pipe(fs.createWriteStream('1_pipe.jpg'))