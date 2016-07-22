'use strict';
var gulp = require('gulp'),
  template = require('gulp-template'),
  conflict = require('gulp-conflict'),
  install = require('gulp-install'),
  inquirer = require('inquirer');

  // plugins = require('gulp-load-plugins')({
  //   lazy: true
  // }),
  // _ = require('lodash');


gulp.task('default', function(done) {
  inquirer.prompt([{
      type: 'input',
      name: 'appName',
      message: 'What do you want to name your app?',
      default: getNameProposal()
    }, {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
    },
    function(answers) {
      if (!answers.moveon) {
        return done();
      }

      gulp.src(__dirname + '/templates/ng-full-stack/**')
        .pipe(template(answers))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(install())
        .on('finish', function() {
          done();
        });
    }

  ]);

});

function getNameProposal() {
  var path = require('path');
  try {
    return require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    return path.basename(process.cwd());
  }
}
