 //使用Buffer实现图片的额复制

 var fs = require('fs')

 fs.readFile('1.jpg', function(err, origin_buffer){
    console.log(Buffer.isBuffer(origin_buffer)) //判断origin_buffer是否是buffer
    // 写一个新文件
    fs.writeFile('1_buffer.jpg', origin_buffer, function(err){
        if(err){
            console.log(err)
        }
    })

    // 构建一个新的Buffer ，将图片转成base64编码
    // var base64Image = new Buffer(origin_buffer).toString('base64')
    var base64Image = origin_buffer.toString('base64')
    console.log(base64Image)

    var decodedImage = new Buffer(base64Image, 'base64')
    console.log(Buffer.compare(origin_buffer, decodedImage))

    fs.writeFile('1_decoded.jpg', decodedImage, function(err){
        if(err) console.log(err)
    })

 })