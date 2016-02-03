/////////////////////////////////////////////
//
// gulp-comment-swap
//
// Swap lines with comment in and out if they match regexp
//
// Sample: comment out all typescript files that contain /*webpack*/
//         and comment in all lines that have /*systemjs*/ (swap)
//
//gulp.task('systemjs', function (done) {
//    gulp.src('./src/**/*.ts')
//        .pipe(commentSwap(new RegExp('/\\*webpack\\*/'),new RegExp('/\\*systemjs\\*/'))).on('error', handleError)
//        .pipe(gulp.dest('./src'));
//    done()
//});
//
/////////////////////////////////////////////

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');
var template = '';
var commentLine;
var uncommentLine;

const PLUGIN_NAME = 'gulp-comment-swap';

module.exports = function (i_commentLine, i_uncommentLine) {
    commentLine = i_commentLine;
    uncommentLine = i_uncommentLine;
    return through.obj(function (file, encoding, next) {
        loadTemplate(file, encoding, next);
    });
};

function loadTemplate(file, encoding, next) {

    var fileData = file.contents.toString('utf8');

    if (!fileData.match(commentLine))
        return next(null, file);

    template = '';
    var fileName = file.history[0];
    var c = 0;
    var lines = fileData.split('\n')
    for (var line in lines) {
        c++;
        var lineData = lines[line];
        if (lineData.match(commentLine) && !lineData.match('//')) {
            console.log('Convering ' + fileName);
            lineData = lineData.replace('\t', '');
            lineData = '//' + lineData;
        } else if (lineData.match(uncommentLine)) {
            console.log('Convering ' + fileName);
            lineData = lineData.replace(/\/\//, '\t');
        }
        if (lines.length == c) {
            template = template + lineData;
        } else {
            template = template + lineData + '\n';
        }

    }
    file.contents = new Buffer(template);
    next(null, file);
    return;
}



