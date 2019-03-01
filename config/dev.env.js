'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.99.113.195:3000/api"',  //  api
  // BASE_API: '"http://192.168.1.101:3000/api"',  //  api
  imgR: '"http://47.99.113.195:3000"'
});
