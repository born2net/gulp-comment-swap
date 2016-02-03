gulp-comment-swap
===============

Swap lines with comment in and out if they match regexp
-------------

Sample: comment out all typescript files that contain /*webpack*/ and comment in all lines that have /*systemjs*/ (swap)

```
gulp.task('systemjs', function (done) {
    gulp.src('./src/**/*.ts')
        .pipe(commentSwap(new RegExp('/\\*webpack\\*/'),new RegExp('/\\*systemjs\\*/'))).on('error', handleError)
        .pipe(gulp.dest('./src'));
    done()
});
```