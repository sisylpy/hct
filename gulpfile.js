
//载入gulp核心包
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const htmlmin = require('gulp-htmlmin');
const minifyCss = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const del = require('del');
const connect = require('gulp-connect');
const fileinclude = require('gulp-file-include');
var changed = require('gulp-changed');
var ejs = require('gulp-ejs');
var log = require('fancy-log');


// const concat = require('gulp-concat');


//压缩html文件
gulp.task('htmlmin',function () {
    gulp.src('html/*.*')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist/html'));
});
//复制html文件
gulp.task('htmlcopy',function () {
    gulp.src('html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(changed('dist/html'))
        .pipe(gulp.dest('dist/html'));
});


//压缩css
gulp.task ('minify',function () {
    gulp.src('stylesheets/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/stylesheets'));
});

//复制css
gulp.task ('minicopy',function () {
    gulp.src('/public/stylesheets/*.css')
        .pipe(changed('dist/stylesheets'))
        .pipe(gulp.dest('/'));
});

//压缩image文件
gulp.task ('imagemin',function () {
    gulp.src('images/hct/Huichangtong-assets/*.*')
        .pipe(changed('dist/images/hct/Huichangtong-assets'))
        .pipe(gulp.dest('dist/images/hct/Huichangtong-assets'));
});

//压缩js
gulp.task ('uglify',function () {
    gulp.src('js/*.*')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//复制jsn
gulp.task ('uglifycopy',function () {
    gulp.src('js/*.*')
        .pipe(gulp.dest('dist/js'));
});



//ejs

gulp.task('ejs',function () {
  gulp.src('views/socket-ejs-study.ejs')
    .pipe(ejs({
      msg: 'Hello Gulp!'
    },{},{ext: '.html'}).on('error', log))
    .pipe(gulp.dest('./'))

})


//合并js,noUse!
gulp.task ('concact',function () {
    gulp.src('js/*.*')
        .pipe($.concat('hct.js'))
        .pipe($.rename('hct.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

//检查代码问题



//del
gulp.task('clean',function () {
    del(['dist/html','dist/stylesheets','dist/images','dist/js','hct-html/**']);
})

//server
gulp.task('serve',function () {
   connect.server({
       root:'dist',
       livereload: true
   });
    gulp.watch('dist/**/*.*',['reload']);
});
//reload
gulp.task('reload',function () {
    gulp.src('dist/**/*.*')
        .pipe(connect.reload());
});


// watch
gulp.task ('watch',function () {
    // gulp.watch('html/*.*',['htmlcopy']);
    gulp.watch('views/*.*',['ejs']);
    gulp.watch('stylesheets/*.*',['minicopy']);
    gulp.watch('js/*.*',['uglifycopy']);
    gulp.watch('images/hct/Huichangtong-assets/*.*',['imagemin']);
});


// gulp.task('default', ['ejs','htmlcopy','minicopy','imagemin','uglifycopy','serve','watch']);

gulp.task('default', ['ejs','minicopy']);






//copy Particle
// gulp.task('particles',function () {
//     gulp.src('particles/**/*.*')
//         .pipe(gulp.dest('dist/particles'));
// })
//
// //copy bootstrap
// gulp.task('bootstrap',function () {
//     gulp.src('bootstrap/**/*.*')
//         .pipe(gulp.dest('dist/bootstrap'));
// })