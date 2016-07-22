'use strict';
var gulp = require('gulp'),
  template = require('gulp-template'),
  conflict = require('gulp-conflict'),
  install = require('gulp-install'),
  rename = require('gulp-rename'),
  inquirer = require('inquirer');

// plugins = require('gulp-load-plugins')({
//   lazy: true
// }),
// _ = require('lodash');





function defaultTask(done) {
  function getNameProposal() {
    var path = require('path');
    try {
      return require(path.join(process.cwd(), 'package.json')).name;
    } catch (e) {
      return path.basename(process.cwd());
    }
  }
  var questions = [{
    type: 'input',
    name: 'appName',
    message: 'What do you want to name your app?',
    default: getNameProposal()
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }];

  function callback(answers) {
    console.log('answers---------',answers);
    if (!answers.moveon) {
      return done();
    }

    process.chdir('./temp');
    gulp.src('../templates/ng-full-stack/**')
      .pipe(template(answers))
      .on('data',function(d){console.log(d);})
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename =file.basename.slice(1);
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('finish', function() {
        done();
      });
  }

  inquirer.prompt(questions).then(callback);
}

gulp.task('default', defaultTask);
