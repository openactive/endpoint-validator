const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const argvBuilder = require('yargs');

gulp.task('copy-public', () => {
  return gulp.src('src/public/*')
    .pipe(gulp.dest('dist/src/public'));
});

gulp.task('build-src', () => {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/src/'));
});

gulp.task('build-test', () => {
  return gulp.src('test/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/test/'));
})

gulp.task('build', ['build-src', 'build-test', 'copy-public'])

gulp.task('test', () => {
    return gulp.src('dist/test/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('validate', () => {
  argv = argvBuilder
            .options({
              'url':{demand: true, requiresArg: true, type: 'string'},
            })
            .argv
  const validate = require('./dist/src/index').validate;
  return validate(argv.url)
    .then(function(result) {
      console.log(result);
    });
});
