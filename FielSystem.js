/**
 * Created by Administrator on 2017/3/19.
 */

//学习Node.js文件系统模块的系列练习代码

//fs.open(path,flags,[]mode,callback)
/*
var fs = require('fs');
fs.open('1.txt','r',function (err,fd) {
    //console.log(err); //null ,成功打开了文件
    // console.log(fd); //3
    if(err){
        console.log('文件打开失败！');
    }else{
        console.log('文件打开成功！');
    }
});

var fd = fs.openSync('1.txt','r');
console.log(fd); //3
*/

/*
var fs = require('fs');
fs.open('1.txt','r',function (err,fd) {
    if(err){
        console.log('文件打开失败！');
    }else{ //读取文件
        var buf = new Buffer(20); //读取到的文件内容将存在这个buffer对象中
        console.log(buf); //<Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
        fs.read(fd,buf,1,4,null,function (err1,len,nbf) {
            console.log(buf); //<Buffer 00 68 65 6c 6c 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
            console.log(err1); //null
            console.log(len); //4
            console.log(nbf); //<Buffer 00 68 65 6c 6c 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>

        });
    }
});
*/

/*
var fs = require('fs');
fs.open('1.txt','r+',function (err,fd) {
   if(err){
       console.log('文件打开失败！');
   } else{
       /!*var buf1 = new Buffer('how are you ?');
       fs.write(fd,buf1, 0,buf1.length,25,function () {
           console.log(arguments); //{ '0': null, '1': 13, '2': <Buffer 68 6f 77 20 61 72 65 20 79 6f 75 20 3f> }
       } )*!/
       fs.write(fd, 'I am fine , thanks .', 25);
       fs.close(fd,function () {
          //这里面可以重新打开文件再进行操作等
       });
   }
});
*/


//fs.writeFile(filename,data.callback)
/*
var fs = require('fs');
var filename = '2.txt';  //2.txt文件原来不存在

fs.writeFile(filename, 'hello', function () {
    console.log(arguments); //{ '0': null }
});
fs.appendFile(filename, ' world' ,function () {
    console.log(arguments);
});
*/

var fs = require('fs');
var filename = '2.txt';

/*
fs.exists(filename,function (err) { //判断文件是否存在
    console.log(err); //true表示存在，false表示不存在
    if(!err){ //文件不存在
        fs.writeFile(filename,'hello',function (e) {
            if(e){
                console.log('创建文件出错了！');
            }else{
                console.log('创建文件成功！');
            }
        });
    }else{ //文件存在
        fs.appendFile(filename, ' world',function (er) {
            if(er){
                console.log('添加文件内容失败！');
            }else{
                console.log('添加文件内容成功！');
            }
        });
    }
});
*/

//同步模式
/*
if(!fs.existsSync(filename)){
    fs.writeFileSync(filename,'hello');
    console.log('新文件创建成功！');
}else{
    fs.appendFileSync(filename, ' world');
    console.log('追加文件内容成功！')
}
*/

//读文件
/*
var fs = require('fs');
fs.readFile('2.txt', function (err,data) {
    console.log(arguments);
    if(err){
        console.log('读文件内容失败！');
    }else{
        console.log(data.toString()); //输出读到的2.txt文件的内容
    }
});
*/

 /*
 fs.unlink('1.txt', function (err) {
     if(err){
         console.log('删除失败！');
     }else{
         console.log('删除成功！');
     }
     console.log(err);
 });
 */

 /*
 fs.rename('2.txt','2.new.txt',function () {
     console.log(arguments);
 });
 */

 /*
 fs.stat('1.txt', function (err,data) {
     console.log(err);
     console.log(data);
 })
 */

 /*//监听文件状态的变化
var filename = '1.txt';
fs.watch(filename, function (ev,fn) {
    console.log(ev);
    if(fn){ //判断是否支持
        console.log(fn + '发生了改变');
    }else{
        console.log('......');
    }
});
*/

 /*
 fs.mkdir('./1', function () {
     console.log(arguments); //{ '0': null }
 });

 fs.rmdir('./2', function () {
     console.log(arguments); //{ '0': null }
 })
 */


 fs.readdir('../fs', function (err,fileList) {
     console.log(err);
     console.log(fileList); //fileList是一个数组，存储读取目录下的全部文件、文件夹*!/
     fileList.forEach(function (f) {
        fs.stat(f,function (err, info) {
            //console.log(arguments);
            switch (info.mode){
                case 16822:
                    console.log('[文件夹] ' + f);
                    break;
                case 33206:
                    console.log('[文件] ' + f);
                    break;
                default:
                    console.log('其它文件 ' + f);
                    break;
            }
        });
    });
});