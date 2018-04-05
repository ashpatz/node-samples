const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/*
const redisConnectionOptions = {
    url: 'redis://cache-apigateway-dev.in4bqk.ng.0001.usw2.cache.amazonaws.com:6379'
};
*/

const client = redis.createClient();

module.exports = {redisClient: client};
