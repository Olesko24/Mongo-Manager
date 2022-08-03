var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task('default', () => {
    let tsProject = ts.createProject("tsconfig.json");
    return gulp.src(['src/**/*.ts'])
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
})