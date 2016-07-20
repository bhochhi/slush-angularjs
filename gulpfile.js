'use strict';
var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({lazy: true}),
  inquirer = require('inquirer'),
  _ = require('lodash');


gulp.task('default', function(done) {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'What do you want to name your app?',
    default: getNameProposal()
  }])

});

function getNameProposal() {
  var path = require('path');
  try {
    return require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    return path.basename(process.cwd());
  }
}
