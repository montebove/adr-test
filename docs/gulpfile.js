const gulp = require('gulp');
const { Bin } = require('./gulp/utils');

const bin = new Bin(require('./gulp-config'));

// Import gulp task functions
const { clean, prepare, html, word } = require('./gulp/tasks');

gulp.task('clean', clean(bin));

gulp.task('prepare', prepare(bin));

gulp.task('html', gulp.series('prepare', html(bin)));
  
gulp.task('word', gulp.series('prepare', word(bin)));

gulp.task('build', gulp.series('html', 'word', cb => cb()));

gulp.task('default', gulp.series('build', cb => cb()));
