const gulp = require('gulp');

const ts = require('gulp-typescript');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const browserify = require('browserify');

const tsProject = ts.createProject('tsconfig.json');

const spawn = require('child_process').spawn;

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
    return gulp.watch('src/**/*', { ignoreInitial: false }, gulp.series('build', 'start'));
});

let child;

gulp.task('start', (cb) => {
    if (child) {
        child.kill();
    }
    child = spawn('node', ['release/server.js'], { stdio: 'inherit' });
    cb();
});

// gulp.task('default', ['watch']);
