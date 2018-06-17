/**
 * Dependencies
 */
let gulp         = require( 'gulp' ),
    browserify   = require( 'browserify' ),
    babelify     = require( 'babelify' ),
    source       = require( 'vinyl-source-stream' ),
    buffer       = require( 'vinyl-buffer' ),
    gulp_clean   = require( 'gulp-clean' ),
    gulp_stylus  = require( 'gulp-stylus' ),
    gulp_sass    = require( 'gulp-sass' ),
    gulp_cssnano = require( 'gulp-cssnano' ),
    gulp_uglify  = require( 'gulp-uglify' ),
    gulp_notify  = require( 'gulp-notify' ),
    sourcemaps   = require( 'gulp-sourcemaps' ),
    watchify     = require( 'watchify' ),
    browserSync  = require( 'browser-sync' ).create()

/**
 * Params
 */

/**
 * Scripts bundle
 */
let bundler = null

const bundleLotr = function()
{
    bundler.bundle()
        .on( 'error', gulp_notify.onError( { title: 'Gulp: scripts' } ) )
        .pipe( source( 'bundle-lotr.js') )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( '../dist/assets/javascript' ) )
        .pipe( browserSync.stream() )
        .pipe( gulp_notify( { title: 'Gulp: scripts', message: 'success lotr bundle' } ) )
}
const bundleMajoras = function()
{
    bundler.bundle()
        .on( 'error', gulp_notify.onError( { title: 'Gulp: scripts' } ) )
        .pipe( source( 'bundle-majoras.js') )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( '../dist/assets/javascript' ) )
        .pipe( browserSync.stream() )
        .pipe( gulp_notify( { title: 'Gulp: scripts', message: 'success majora bundle' } ) )
}
const bundle = function()
{
    bundler.bundle()
        .on( 'error', gulp_notify.onError( { title: 'Gulp: scripts' } ) )
        .pipe( source( 'bundle-index.js' ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( '../dist/assets/javascript' ) )
        .pipe( browserSync.stream() )
        .pipe( gulp_notify( { title: 'Gulp: scripts', message: 'success' } ) )
}

/**
 * Scripts
 */
gulp.task( 'scripts', function()
{
    // Create bundler
    bundler = browserify( {
            cache       : {},
            packageCache: {},
            entries     : '../sources/javascript/index.js',
            debug       : true,
            paths       : [ './node_modules', '../sources/javascript/index.js', '../sources/javascript/components' ]
        } )
        .transform( 'babelify', { presets: [ 'babel-preset-es2015' ].map( require.resolve ) } )

    // Watch
    bundler.plugin( watchify )

    // Listen to bundler update
    bundler.on( 'update', bundle )  

    // Bundle
    bundle()

})
gulp.task( 'scripts-majora', function()
{
    // Create bundler
    bundler = browserify( {
            cache       : {},
            packageCache: {},
            entries     : '../sources/javascript/majoras.js',
            debug       : true,
            paths       : [ './node_modules', '../sources/javascript/majoras.js','../sources/javascript/components']
        } )
        .transform( 'babelify', { presets: [ 'babel-preset-es2015' ].map( require.resolve ) } )

    // Watch
    bundler.plugin( watchify )

    // Listen to bundler update
    bundler.on( 'update', bundleMajoras )  

    // Bundle
    bundleMajoras()
})


gulp.task( 'scripts-lotr', function()
{
    // Create bundler
    bundler = browserify( {
            cache       : {},
            packageCache: {},
            entries     : '../sources/javascript/lotr.js',
            debug       : true,
            paths       : [ './node_modules', '../sources/javascript/lotr.js','../sources/javascript/components']
        } )
        .transform( 'babelify', { presets: [ 'babel-preset-es2015' ].map( require.resolve ) } )

    // Watch
    bundler.plugin( watchify )

    // Listen to bundler update
    bundler.on( 'update', bundleLotr )  

    // Bundle
    bundleLotr()
})


/**
 * Styles
 */
gulp.task( 'styles', function()
{
    return gulp.src( '../sources/scss/main.scss' )
        .pipe( gulp_sass( {
            compress: false
        } ) )
        .on( 'error', gulp_notify.onError( { title: 'Gulp: styles' } ) )
        .pipe( sourcemaps.init( { loadMaps: true } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( '../dist/assets/stylesheet' ) )
        .pipe( browserSync.stream( { match: '**/*.css' } ) )
        .pipe( gulp_notify( { title: 'Gulp: styles', message: 'success' } ) )
} )

/**
 * Serve
 */
gulp.task( 'serve', function()
{
    // Browsersync
    browserSync.init( {
        // proxy: 'http://domain.dev'
        server:
        {
            baseDir  : '../dist'
        }
    } )
} )

/**
 * Build
 */
gulp.task('build-pages', function ()
{
    return gulp.src('./../sources/pages/*.html')
        .pipe(gulp.dest('./../dist/pages/'))
})
gulp.task('build-index', function ()
{
    return gulp.src('./../sources/index.html')
        .pipe(gulp.dest('./../dist/'))
        .pipe( gulp_notify( {
            title  : 'Gulp: build-index',
            message: 'success'
        } ) )
})
gulp.task( 'build-scripts', function()
{
    return gulp.src( '../dist/assets/javascript/bundle.js' )
        .pipe( gulp_uglify() )
        .pipe( gulp.dest( '../dist/assets/javascript' ) )
} )

gulp.task( 'build-sounds', function()
{
    return gulp.src( ['../sources/assets/sounds/*.mp3', '../sources/assets/sounds/*.wav'] )
        .pipe( gulp.dest( '../dist/assets/sounds' ) )
} )

gulp.task( 'build-obj', function()
{
    return gulp.src( '../sources/assets/objects/*.obj' )
        .pipe( gulp.dest( '../dist/assets/objects' ) )
} )

gulp.task( 'build-img', function()
{
    return gulp.src( '../sources/assets/images/*.png' )
        .pipe( gulp.dest( '../dist/assets/images' ) )
} )

gulp.task( 'build-video', function()
{
    return gulp.src( '../sources/assets/images/*.mp4' )
        .pipe( gulp.dest( '../dist/assets/images' ) )
} )

gulp.task( 'build-styles', function()
{
    return gulp.src( '../dist/assets/stylesheet/main.css' )
        .pipe( gulp_cssnano() )
        .pipe( gulp.dest( '../dist/assets/stylesheet' ) )
} )

gulp.task( 'remove-maps', function()
{
    return gulp.src( [ '../dist/assets/javascript/bundle.js.map', '../dist/assets/stylesheet/main.css.map' ] )
        .pipe( gulp_clean( { force: true, read: false } ) )
} )

gulp.task( 'build', [ 'build-index', 'build-pages', 'build-scripts', 'build-styles', 'remove-maps', 'build-sounds','build-obj', 'build-img','build-video'], function()
{
    return gulp.src( './' )
        .pipe( gulp_notify( {
            title  : 'Gulp: build',
            message: 'success'
        } ) )
} )

/**
 * Default
 */
gulp.task( 'default', function()
{
    // Scripts
    gulp.start( 'scripts' )
    gulp.start( 'scripts-majora' )
    gulp.start( 'scripts-lotr' )
    // Styles
    gulp.start( 'styles' )
    gulp.watch( '../sources/scss/**', [ 'styles' ] )
    gulp.watch( './../sources/*.html', ['build-index'])
    gulp.watch( './../sources/pages/*.html', ['build-pages'])
    gulp.start( 'build' )
    // Serve
    gulp.start( 'serve' )
} )
