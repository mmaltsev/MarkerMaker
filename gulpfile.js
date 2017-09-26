let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');

gulp.task('default', () => {
  gulp.src('src/main.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
