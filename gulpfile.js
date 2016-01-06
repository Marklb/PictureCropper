var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function() {
  return gulp.src('src/**/*.es6')
    .pipe(babel())
    .pipe(gulp.dest('js'))
});




gulp.task('default', ['babel']);

gulp.task('watch', ['babel'], function (){
  gulp.watch('src/**/*.es6', ['babel']);
});
