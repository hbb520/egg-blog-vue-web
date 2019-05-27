'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://47.99.113.195:3000/api"',  //  api

  // BASE_API: '"http://127.0.0.1:3000/api"',  //  api

  imgR: '"http://47.99.113.195:3000"'
});
