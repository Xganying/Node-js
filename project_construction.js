/**
 * Created by Administrator on 2017/3/20.
 */

//前端项目自动化-构建

var projectData ={
    'name': 'myProject',
    'fileData':[
        {
            'name': 'css',
            'type':'dir'
        },
        {
            'name': 'js',
            'type':'dir'
        },
        {
            'name': 'images',
            'type':'dir'
        },
        {
            'name': 'index.html',
            'type':'file',
            content:'<html>\n\t<head>\n\t\t<title>title</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello</h1>\n\t</body>\n</html>'
        }
    ]
};
var fs = require('fs');
if(projectData.name){
    fs.mkdirSync(projectData.name);
    var fileData = projectData.fileData;
    if(fileData && fileData.forEach){ //判断fileData存在并且是一个数组
        fileData.forEach(function (f) { //f表示数组中的每一个对象
            f.path = projectData.name + '/' + f.name;
            f.content = f.content || '';
            switch (f.type){
                case 'dir':
                    fs.mkdirSync(f.path);
                    break;
                case 'file':
                    fs.writeFileSync(f.path, f.content);
                    break;
                default:
                    break;
            }
        });
    }
}


