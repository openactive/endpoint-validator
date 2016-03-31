var path = require('path')
var fs = require('fs-extra')
var gulp = require('gulp')
var runSequence = require('run-sequence')
var webpack = require('webpack')
var webpackConfig = require('./webpack/prod.config')
var compiler = webpack(webpackConfig)

var clean = function() {
  fs.removeSync('dist')
}

var copyIndexHtml = function() {
  fs.copySync('index.html', 'dist/index.html')
}

var js = function(cb) {
  compiler.run(function(err, stats) {
    if (err) { cb(err) }
    else { cb() }
  })
}

var build = function(cb) {
  runSequence(
    'clean',
    ['copy-index-html', 'js'],
    cb
  )
}

gulp.task('clean', clean)
gulp.task('copy-index-html', copyIndexHtml)
gulp.task('js', js)
gulp.task('build', build)
