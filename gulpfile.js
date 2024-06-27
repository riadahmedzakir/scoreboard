const gulp = require('gulp');
const rename = require('gulp-rename');

gulp.task('depedencies', async function () {
    return gulp.src(
        [
            './public/favicon.svg',
            './.nojekyll',
        ]
    )
        .pipe(gulp.dest('docs/'))
});

gulp.task('file-404', async function () {
    return gulp.src('docs/index.html')
        .pipe(rename(function (path) {
            path.basename = '404';
        }))
        .pipe(gulp.dest('docs/'))
});

gulp.task('file-200', async function () {
    return gulp.src('docs/index.html')
        .pipe(rename(function (path) {
            path.basename = '200';
        }))
        .pipe(gulp.dest('docs/'))
});

gulp.task('default', gulp.series('depedencies', 'file-404', 'file-200'));