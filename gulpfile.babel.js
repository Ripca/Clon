// //HTML
// import htmlmin from 'gulp-htmlmin'
// //PUG
// import pug from 'gulp-pug' // llamar GulpPug

// //CSS
// import postcss from 'gulp-postcss'
// import cssnano from 'cssnano'
// import autoprefixer from 'autoprefixer'  //el autoprefixer puede dar error por que falta .browserlistrc (gulp video 2)
// //Purgar css
// import clean from 'gulp-purgecss' //SOlo hacer una tarea para esta y usarla al final del proyecto
// //SASS
// import sass from 'gulp-sass'

// //JavaScipt
// import  gulp, { src } from 'gulp'
// import babel from 'gulp-babel'
// import terser from 'gulp-terser'

// //Common
// import concat from 'gulp-concat'

// //Cache bust
// import cacheBust from 'gulp-cache-bust';

// //Optimizar imagenes
// import imagemin from 'gulp-imagemin';

// //Browser sync
// import {init as server, stream,reload} from 'browser-sync'

// //Uglify: hacer nuestro codigo js ilegible 
// import GulpUglify from 'gulp-uglify'

// //Plumber
// import plumber from 'gulp-plumber'  //se agrega en todos los metodos despues del src(la ruta inicial)

// //REmover cometarios y espacios     
// gulp.task("html-min",()=>{
//     return gulp
//     // .src('./dev/js/*.js')   cambiar ruta origen
//     .pipe(htmlmin({
//         collapseWhitespace:true,
//         removeComments:true
//     }))
//     .pipe(gulp.dest('./public/js'))
// })


// gulp.task("babel",()=>{
//     return gulp
//     .src('./dev/js/*.js')
//     // .pipe(concat('script-min.js'))
//     .pipe(babel({
//         // presets:['@babel/env']
//     }))
//     .pipe(terser())
//     .pipe(gulp.dest('./public/js'))
// })

// gulp.task("default",()=>{
//     gulp.watch('./dev/js/*.js',gulp.series('babel'))
//     // gulp.watch('./dev/js/*.js',gulp.series('html'))escucha html crear tarea
//     // gulp.watch('./dev/js/*.js',gulp.series('css')) escucha css crear tarea
//     //Solo ejemplo gulp.watch('./dev/**/*.js',gulp.series('css')) asi vigila cada subcarpeta de dev con archivos css
// })

// //HACER UN gulp en la consola cada que inicio el proyecto o cada que hago un cambio  































//Constantes para el automatizador de tareas
const gulp = require('gulp')
const pug = require('gulp-pug')
// const sass = require('gulp-sass')
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify');


//Constante para el modulo de recarga automática del sitio web al hacer cambios

import { init as server,stream,reload } from 'browser-sync';
// const browserSync = require('browser-sync')

//Instancia del servidor de desarrollo
// const server = browserSync.create()

gulp.task('pug', () => {
  return gulp.src('./dev/views/pages/*.pug')
    .pipe(pug({
      pretty: true //si da un erro el pug revisar esta linea el video sobre este valor, ver si no necesita una variable
    }))
    .pipe(gulp.dest('./public/'))
})

//tarea para los estilos de la UX
gulp.task("styles", () => {
  return gulp
    .src('./dev/scss/styles.scss')
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle:'expanded'
      })
    )
    // .pipe(
    //   autoprefixer()
    // )
    .pipe(gulp.dest('./public/css/'))
    .pipe(server.stream())   //REVISAR PARA QUE SIRVE ESTE PIPE
})

//tarea para el js de la UX
gulp.task("babel", () => {
  return gulp
    .src("./dev/js/*.js")
    .pipe(plumber())
    .pipe(
      babel({ presets: [ "@babel/preset-env" ] })
    )
    .pipe(concat("scripts-min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./public/js/"))
})

//tarea por defecto para que se ejecuten todas
gulp.task('default', () => {
  //Iniciación del servidor en el puerto 80
  server({
    server: './public'
  })

  //Watchers (vigilantes) para vigilar los cambios y mostrarlos en tiempo real
  //PUG
  gulp.watch('./dev/views/**/*.pug', gulp.series('pug')).on('change', server.reload)
  //SCSS
  gulp.watch('./dev/scss/**/*.scss', gulp.series('styles'))

  //JS
  gulp.watch("./dev/js/*.js", gulp.series('babel')).on('change', server.reload)
})

