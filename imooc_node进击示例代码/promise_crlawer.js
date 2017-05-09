
//优化的爬虫示例 （但是并没有爬取到数据，有些小问题）

var http = require('http')
// var Promise = require('Promise')
var Promise = require('bluebird')
var cheerio = require('cheerio')
var baseUrl =  'http://www.imooc.com/learn/348'
var url = 'http://www.imooc.com/learn/348'
var videosIds =[348, 259, 197, 134, 75, 637,728]

function filterChapter(html){
    var $ = cheerio.load(html)
    var chapter = $('.learnchapter')
    var title = $('#page_header .path span').text()
    var number = parseInt( $($('.info_num i')[0]).text().trim(), 10)

    // courseData = {
    //     title:title,
    //     number: number,
    //     vidoes: [{
    //         title: '',
    //         id: ''
    //     }]
    // }

    var courseData = {
        videos: [],
        number: number,
        videos: []
    }

    chapter.each(function(item){
        var chapter = $(this)
        var chapterTitle = chapter.find('strong').text()
        var videos = chapter.find('video').children('li')
        var chapterData = {
            chapterTitle : chapterTitle,
            videos: []
        }
        videos.each(function(item){
            var video = $(thia).find('.studyvideo')
            var videoTitle = video.text()
            var id = video.attr('href').split('/video')[1]

            chapterData.videos.push({
                title: videoTitle,
                id:id
            })
        })
        courseData.videos.push(chapterData)
    })
    return courseData
}

function printlnCourseInfo(courseData){
    courseData.forEach(function(courseData){
        console.log(courseData.number + ' 人学过' + courseData.title + '\n')
    })
    
    courseData.forEach(function(courseData){
        console.log('### ' + courseData.title + '\n')
        courseData.videos.forEach(function(item){
            var chapterTitle = item.chapterTitle
            console.log(chapterTitle + '\n')
            item.videos.forEach(function(item){
                console.log(' [' + video.id + ' ] ' + video.title + '\n')
            })
        })
    })
}

function getPageAsync(url){
    return new Promise(function(resolve, reject){
        console.log('正在爬取数据 ' + url)
        http.get(url, function(res){
            var html =''

            res.on('data', function(data){
                html += data
            })

            res.on('end', function(){   
                resolve(html)
                // var courseData = filterChapter(html)
                // printlnCourseInfo(courseData)
            })
        }).on('error', function(e){
            reject(e)
            console.log('获取数据失败！')
        })
    })
}

var fetchCourseArray = []
videosIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl + id))
})

Promise
    .all(fetchCourseArray)
    .then(function(pages){
       var coursesData = []
        pages.forEach(function(html){
            var courses = filterChapter(html)
            coursesData.push(courses)
        })
        coursesData.sort(function(a,b){
            return a.number < b.number
        })
        printlnCourseInfo(coursesData)
    })

