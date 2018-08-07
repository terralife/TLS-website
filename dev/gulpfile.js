// Cornerstone Digital Gulp file for CraftCMS
// heavily borrowed and modified from https://github.com/nystudio107/craft


// Define Local Server
const localServer = 'tls.local';

// Load gulp
const gulp = require("gulp");

// load all plugins in "devDependencies" into the variable $
const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});

// log Gulp errors to the console
const onError = (err) => {
    console.log(err);
};


// set static asset version number in general.php
gulp.task("static-assets-version", () => {
    gulp.src("../craft/config/general.php")
        .pipe($.replace(/'staticAssetsVersion' => (\d+),/g, function(match, p1, offset, string) {
            p1++;
            $.fancyLog("-> Changed staticAssetsVersion to " + p1);
            return "'staticAssetsVersion' => " + p1 + ",";
        }))
        .pipe(gulp.dest("../craft/config/"));
});


// SCSS - compile to build folder, include source maps
gulp.task("scss", () => {
    $.fancyLog("-> Compiling scss");
    return gulp.src('./src/scss/main.scss')
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sass({
                includePaths: []
            })
            .on("error", $.sass.logError))
        .pipe($.cached("sass_compile"))
        .pipe($.autoprefixer('last 4 version'))
        .pipe($.sourcemaps.write("./"))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest('./build/css/'));
});


// CSS - run SCSS task, then compile CSS to /public/assets/css
gulp.task("css", ["static-assets-version", "scss"], () => {
    $.fancyLog("-> Building css");
    return gulp.src("./build/css/*.css")
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.newer({dest: "../public/assets/css/main.css"}))
        // .pipe($.print())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.concat('main.min.css'))
        .pipe($.cssnano({
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
        }))
        // .pipe($.header(banner, {pkg: pkg}))
        .pipe($.sourcemaps.write("./"))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest("../public/assets/css/"))
        .pipe($.filter("**/*.css"))
        .pipe($.notify({
            title: 'Gulp',
            subtitle: 'success',
            message: 'BAM!'
        }))
   .pipe($.browserSync.stream());
});


// babel js task - transpile our Javascript into the build directory
gulp.task("js-babel", () => {
    $.fancyLog("-> Transpiling Javascript via Babel...");
    return gulp.src("./src/js/*.js")
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.newer({dest: "./build/js/"}))
        .pipe($.babel())
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest("./build/js/"));
});


// js task - minimize any distribution Javascript into the public js folder, and add our banner to it
gulp.task("js", ["static-assets-version", "js-babel"], () => {
    $.fancyLog("-> Building js");
    return gulp.src([
        "./src/js/vendor/*.js",
        "./build/js/app.js"])
        .pipe($.concat('main.js'))
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.if(["*.js", "!*.min.js"],
            $.newer({dest: "../public/assets/js", ext: ".min.js"}),
            $.newer({dest: "../public/assets/js"})
        ))
        .pipe($.if(["*.js", "!*.min.js"],
            $.uglify()
        ))
        .pipe($.if(["*.js", "!*.min.js"],
            $.rename({suffix: ".min"})
        ))
        // .pipe($.header(banner, {pkg: pkg}))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest("../public/assets/js"))
        .pipe($.filter("**/*.js"))
        .pipe($.browserSync.reload({stream:true, once: true}));
});

// Setup Browser sync
gulp.task('browser-sync', function() {
    $.browserSync.init(null, {
        proxy: localServer
    });
});
gulp.task('bs-reload', function () {
    $.browserSync.reload();
});




// Gulp Tasks
gulp.task('default', ['css', 'js', 'bs-reload', 'browser-sync'], function () {
    gulp.watch("./src/scss/main.scss", ['css']);
    gulp.watch("./src/scss/*/*.scss", ['css']);
    gulp.watch("./src/scss/*/*/*.scss", ['css']);
    gulp.watch("./src/js/app.js", ['js']);
    gulp.watch("../craft/templates/*.html", ['bs-reload']);
    gulp.watch("../craft/templates/*/*.html", ['bs-reload']);
    gulp.watch("../craft/templates/*/*/*.html", ['bs-reload']);
    gulp.watch("../craft/templates/*/*/*/*.html", ['bs-reload']);
});