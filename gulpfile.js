var gulp = require("gulp");
var babel = require("gulp-babel");
var sourceMaps = require("gulp-sourcemaps");

gulp.task("babel-prod", function () {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("cp-configs", function () {
    return gulp.src("src/configs/**/*")
        .pipe(gulp.dest("dist/configs"));
});

gulp.task("babel-dev", function () {
    return gulp.src(["src/**/*.js"])
        .pipe(sourceMaps.init())
        .pipe(babel())
        .pipe(sourceMaps.write("."))
        .pipe(gulp.dest("dist"));
});

gulp.task("prod", ["babel-prod", "cp-configs"]);
gulp.task("default", ["babel-dev", "cp-configs"]);