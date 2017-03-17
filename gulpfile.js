const gulp = require('gulp');
const gulpPug = require('gulp-pug');
const pug = require('pug');
const verbatim = require('jstransformer-verbatim');
const run = require('run-sequence');
const concat = require('gulp-concat');
const gulpFilter = require('gulp-filter');
const minifycss = require('gulp-minify-css');
const postStylus = require('poststylus');
const stylus = require('gulp-stylus');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const vueify = require('vueify');

pug.filters.verbatim = verbatim;

// javascript
gulp.task('scripts', () => {
  console.info('gulp:scripts');
  return browserify('./src/scripts/index.js', { debug: true })
    .transform(vueify)
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/js/'));
});

// pug
gulp.task('views', () => {
  console.info('gulp:views');
  return gulp.src('./src/views/index.pug')
    .pipe(gulpPug({
      pug,
      pretty: true,
    }))
    .pipe(gulp.dest('./dist/'));
});

// images
gulp.task('images', () => {
  console.info('gulp:images');
  return gulp.src(['./src/images/**/*.gif', './src/images/**/*.png'])
    .pipe(gulp.dest('./dist/images'));
});

// styls
gulp.task('styles', () => {
  console.info('gulp:styles');
  const filter = gulpFilter('**/*.styl', { restore: true });
  return gulp.src([
    './src/**/*.styl',
  ])
    .pipe(filter)
    .pipe(stylus({
      use: [
        postStylus(['autoprefixer', 'rucksack-css']),
      ],
    }))
    .pipe(filter.restore)
    .pipe(concat('index.css'))
    .pipe(minifycss({ keepBreaks: true }))
    .pipe(gulp.dest('./dist/css'));
});

// 監視タスク
gulp.task('watch', () => {
  console.info('gulp:watch');
  gulp.watch([
    './src/**/*.js',
    './src/**/*.vue',
  ], ['scripts']);
  gulp.watch([
    './src/**/*.styl',
  ], ['styles', 'scripts']);
  gulp.watch([
    './src/**/*.pug',
  ], ['views', 'scripts']);
  console.info('gulp:watch started');
});

gulp.task('default', () => {
  return run('scripts', 'styles', 'views', 'images', 'watch');
});
