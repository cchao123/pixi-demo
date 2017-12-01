const gulp = require('gulp');
const mock = require("mockjs");
const webserver = require('gulp-webserver');
const minify = require("gulp-minify-css");
const uglify = require("gulp-uglify");
const image = require("gulp-image");
const concat = require("gulp-concat");
const htmlmin = require("gulp-htmlmin");


//开启服务
gulp.task('webserver',function(){
    gulp.src('.')
        .pipe(webserver({
            livereload:true,
            open:true,
            port:9090,
            host:'localhost',
            fallback:'index.html'
        }))
})

// //压缩css
gulp.task('ysCss',function(){
    gulp.src('./css/style.css')
        .pipe(concat('style.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('css'))
});

// //压缩js 存在ES6语法 报错 所以注释掉
// gulp.task('ysJs',function(){
//     gulp.src('./js/js.js')
//         .pipe(concat('js.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('js'))
// });

//压html
gulp.task('ysHtml',function(){
    gulp.src('./index.html')
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }))
        .pipe(gulp.dest('html'))
});


//压缩图片
gulp.task('ysImg',function(){
    gulp.src('./images/*.{png,jpg,gif}')
        .pipe(image())
        .pipe(gulp.dest('images/imgMin'))
});

//默认启动服务
gulp.task('default',function(){
    gulp.start('webserver','ysCss','ysHtml','ysImg')
})