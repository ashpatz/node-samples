'use strict';

module.exports.sleep = (ms) => new Promise( res => setTimeout(res, ms));