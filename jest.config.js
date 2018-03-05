'use strict';

exports = module.exports = {
  verbose: true,
  testRegex: '/__tests__/.*.(spec|test).(js|jsx)?$',
  globalSetup: './__tests__/setup.js',
  globalTeardown: './__tests__/teardown.js',
  testEnvironment: './__tests__/environment.js',  
};
