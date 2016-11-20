var gulp = require('gulp'),
    inSequence = require('run-sequence'),
    del = require('del'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript');
    wiredep    = require('wiredep');

gulp.task('default', function (done) {

    inSequence(
        'clear',
        [
            'build-vendor',
            'build-app',
            'copy-app-package-file',
            'copy-app-main-file',
            'copy-photon',
            'copy-fonts'
        ],
        'build-html'
    );
});

gulp.task('clear', function (done) {
    del.sync(['dist/**/*'], { force: true });
    done();
});

gulp.task('copy-app-package-file', function () {
    return gulp.src('src/app.package.json')
        .pipe(rename('package.json'))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-app-main-file', function () {
    return gulp.src('src/main.js')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-photon', function () {
    return gulp.src(['bower_components/photon/dist/css/photon.min.css'])
        .pipe(gulp.dest('dist/components/photon'));
});

gulp.task('copy-fonts', function(){
    return gulp.src(['bower_components/photon/dist/fonts/**'])
        .pipe(gulp.dest('dist/components/fonts'));
});

gulp.task('build-vendor', function(){

    return gulp.src([
        "node_modules/systemjs/dist/system.src.js",
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build-app', function () {

    var project = typescript.createProject('tsconfig.json', { });

    var tsResult = project.src()
        .pipe(sourcemaps.init())
        .pipe(typescript('tsconfig.json'));

    return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/js'));
});

gulp.task('build-html', function () {

    var sources = gulp.src(['dist/js/vendor.js', 'dist/js/app.js'], { read: false });

    return gulp.src('src/index.html')
        .pipe(inject(sources, {ignorePath: 'dist',  addRootSlash: false }))
        .pipe(gulp.dest('dist'));
});
