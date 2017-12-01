const gulp = require('gulp');
const mock = require("mockjs");
const webserver = require('gulp-webserver');
const minify = require("gulp-minify-css");
const uglify = require("gulp-uglify");
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

// //压缩js
// gulp.task('ysJs',function(){
//     gulp.src('./js/js.js')
//         .pipe(concat('js.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('js'))
// });

// //压html
gulp.task('ysHtml',function(){
    gulp.src('index.html')
        .pipe(concat('index.min.html'))
        .pipe(htmlmin())
        .pipe(gulp.dest())
});

//默认启动服务
gulp.task('default',function(){
    gulp.start('webserver','ysCss','ysHtml')
})