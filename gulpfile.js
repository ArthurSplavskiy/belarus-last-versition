let { src, dest } = require('gulp');
let fs = require('fs');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let autoprefixer = require('gulp-autoprefixer');
let scss = require('gulp-sass')(require('node-sass'));
let sourcemaps = require('gulp-sourcemaps');
let group_media = require('gulp-group-css-media-queries');
let plumber = require('gulp-plumber');
let del = require('del');
let rename = require('gulp-rename');
let fileinclude = require('gulp-file-include');
let clean_css = require('gulp-clean-css');
let newer = require('gulp-newer');

/*
  * Optimize
*/
// let webpcss = require('gulp-webpcss');
// let webphtml = require('gulp-webp-html');
// ===

let fonter = require('gulp-fonter');

let project_name = require('path').basename(__dirname);
let src_folder = '#src';

let path = {
	build: {
		html: project_name + '/',
		js: project_name + '/js/',
		styles: project_name + '/styles/',
		images: project_name + '/images/',
		others: project_name + '/others/',
		tpl: project_name + '/tpl/',
		fonts: project_name + '/fonts/'
	},
	src: {
		favicon: src_folder + '/images/favicon.{jpg,jpeg,png,svg,gif,ico,webp}',
		tpl: [src_folder + '/tpl/_*.html'],
		html: [src_folder + '/*.html', '!' + src_folder + '/_*.html'],
		js: [src_folder + '/js/app.js', src_folder + '/js/vendors.js'],
		scss: src_folder + '/styles/**/*.scss',
		styles: src_folder + '/styles/index.scss',
		images: [src_folder + '/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', '!**/favicon.*'],
		others: [src_folder + '/others/**/*.{json,mp4,mp3,webm,xml}'],
		fonts: src_folder + '/fonts/*.{woff,woff2}'
	},
	watch: {
		html: src_folder + '/**/*.html',
		js: src_folder + '/**/*.js',
		styles: src_folder + '/styles/**/*.scss',
		images: src_folder + '/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
		others: src_folder + '/others/**/*.{json,mp4,mp3,webm,xml}'
	},
	clean: './' + project_name + '/'
};
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: './' + project_name + '/'
		},
		notify: false,
		port: 9000,
	});
}
function html() {
	return src(path.src.html, {})
		.pipe(plumber())
		.pipe(fileinclude())

		/*
		  * Optimize
		*/
		//.pipe(webphtml()) 
		// ===

		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}
function css() {
	return src(path.src.styles, {})
		.pipe(sourcemaps.init())
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)

		/*
		  * Optimize
		*/
		// .pipe(webpcss(
		// 	{
		// 		webpClass: "._webp",
		// 		noWebpClass: "._no-webp"
		// 	}
		// ))
		.pipe(dest(path.build.styles))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		// ===

		.pipe(sourcemaps.write('./'))
		.pipe(dest(path.build.styles))
		.pipe(browsersync.stream());
}
function js() {
	return src(path.src.js, {})
		.pipe(plumber())
		.pipe(fileinclude())
		.pipe(gulp.dest(path.build.js))

		.pipe(
			rename({

				/*
					* Optimize
				*/
				//suffix: ".min",
				// ===

				extname: '.js'
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}
function images() {
	return src(path.src.images)
		.pipe(newer(path.build.images))

		/*
		  * Optimize
		*/
		// .pipe(
		// 	rename({
		// 		extname: ".webp"
		// 	})
		// )
		// ===

		.pipe(dest(path.build.images))
		.pipe(src(path.src.images))
		.pipe(newer(path.build.images))
		.pipe(dest(path.build.images))
}
function others() {
	return src(path.src.others, {})
		.pipe(dest(path.build.others))
}

function copyScss() {
	return src(path.src.scss, {})
		.pipe(dest(path.build.styles))
}

function copyTpl() {
	return src(path.src.tpl, {})
		.pipe(dest(path.build.tpl))
}

function favicon() {
	return src(path.src.favicon)
		.pipe(plumber())
		.pipe(
			rename({
				extname: '.ico'
			})
		)
		.pipe(dest(path.build.html))
}
function fonts_otf() {
	return src('./' + src_folder + '/fonts/*.otf')
		.pipe(plumber())
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(gulp.dest('./' + src_folder + +'/fonts/'));
}
function fonts() {
	src(path.src.fonts)
		.pipe(plumber())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream());
}
function clean() {
	return del(path.clean);
}
function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.styles], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.images], images);
	gulp.watch([path.watch.others], others);
}
let build = gulp.series(clean, fonts_otf, gulp.parallel(html, css, js, favicon, others, copyScss, copyTpl, images), fonts);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.copyTpl = copyTpl;
exports.copyScss = copyScss;
exports.others = others;
exports.favicon = favicon;
exports.fonts_otf = fonts_otf;
exports.fonts = fonts;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;