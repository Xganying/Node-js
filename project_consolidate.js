
//前端项目自动化-合并

var fs = require('fs');
var filedir = './myProject/source';
fs.watch(filedir, function (ev, file) {
    //console.log(ev + '/' + file); //不需要判断file是否有内容，因为有可能是删除的内容
    //只要有一个文件发生了变化，我们就需要对这个文件夹下的所有文件进行读取，然后合并
    fs.readdir(filedir, function (err, dataList) {
        var arr = [];
        dataList.forEach(function (f) {
            if(f) {
                var info = fs.statSync(filedir + '/' + f);
                // console.log(info);
                if (info.mode == 33206) {
                    arr.push(filedir + '/' + f);
                }
            }
        });
        var content = '';
        arr.forEach(function (f) {
            var c = fs.readFileSync(f);
            content += c.toString() + '\n';   // console.log(c); //输出的是buffer对象
        });
        //读取数组中的文件内容，并合并
        console.log(content); //输出合并后的内容
        fs.writeFile('./myProject/js/index.js',content);
    });
});