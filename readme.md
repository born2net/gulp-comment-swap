gulp-comment-swap
===============

Swap lines with comment in and out if they match regexp
-------------

Sample: comment out all typescript files that contain /\*webpack\*/ and comment in all lines that have /\*systemjs\*/ (swap)

```
npm install gulp-comment-swap -save-dev
```

and usage:

```
gulp.task('systemjs', function (done) {
    gulp.src('./src/**/*.ts')
        .pipe(commentSwap(new RegExp('/\\*webpack\\*/'),new RegExp('/\\*systemjs\\*/'))).on('error', handleError)
        .pipe(gulp.dest('./src'));
    done()
});
```

this is a great way to support both system.js and webpack with Angular2 for example:

```
 **/
@Component({
//    template: require('./App2.html'),  /*webpack*/
	    templateUrl: '/src/comps/app2/App2.html', /*systemjs*/
    providers: [HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, RouterLink, DividerPanel, Menu, MenuItem, Sliderpanel, Digg, Properties,
        Notes, Notes1, Notes2, Notes3, Notes4, Notes5, Weather, Logout, Contact, ModalDialog]
})
export class App2 {
    private screens:any;
    private commBroker:CommBroker;
    ...
```    

the Gulp with swap between the two packaging systems.

enjoy!