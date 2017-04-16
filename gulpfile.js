var gulp = require('gulp');
var watch = require('gulp-watch');
var $ = require('gulp-load-plugins')();

var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var plumber = require('gulp-plumber');


var sassFolder = '_scss',
	sassFiles = '_scss/**/*.scss',  
    cssDest = 'css/';
    
// scripts paths
var jsFiles = [
		'js/vendor/angular.min.js',
		'js/vendor/angular-route.min.js',
		'js/vendor/angular-toArrayFilter.js',
		'js/vendor/angular-swiper.js',
		'js/app.js',
		'js/controllers/config-ctrl.js',
		'js/controllers/movies-ctrl.js',
		'js/controllers/view-ctrl.js',
		'js/controllers/search-ctrl.js',
		'js/services/manage-movie.js',
		'js/services/infos-movie.js',
		'js/directives/movie-card.js',
		'js/directives/movie-card-latest.js',
		'js/routes.js'
	],
    jsDest = 'js';    


gulp.task('css', function(){  
    return gulp.src('_scss/styles.scss')
    	.pipe($.sass({
			outputStyle: 'nested'
		}).on('error', $.sass.logError))
        .pipe( $.autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] }) )
        .pipe(gulp.dest(cssDest));
});

gulp.task('js', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('build.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
         })  )
        .pipe(gulp.dest(jsDest));
});

gulp.task('watch',function() {  
    gulp.watch(sassFiles,['css']);
    gulp.watch(jsFiles,['js']);
});
