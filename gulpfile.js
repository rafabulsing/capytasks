const gulp = require('gulp');

const ts = require('gulp-typescript');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const browserify = require('browserify');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', () => {
    return gulp.src('src/**/*.ts', { since: gulp.lastRun('typescript') })
        .pipe(tsProject())
        .pipe(gulp.dest('release'));
});

gulp.task('browserify', () => {
    const b = watchify(browserify({
        entries: 'src/public/js/index.js',
        debug: true,
        ...watchify.args,
    }));
    
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('release/public/js/'))
});

gulp.task('public', () => {
    return gulp.src(['src/public/**/*', '!src/public/js/**/*'], { since: gulp.lastRun('public') })
        .pipe(gulp.dest('release/public'))
});

gulp.task('build', gulp.parallel('typescript', 'browserify', 'public'));

gulp.task('watch', () => {
    return gulp.watch('src/**/*', gulp.series('build'));
});

// gulp.task('default', ['watch']);
