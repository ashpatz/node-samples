const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisConnectionOptions = {
    /*host: 'cache-apigateway-dev.in4bqk.ng.0001.usw2.cache.amazonaws.com',
    port: 6379,*/
    url: 'redis://cache-apigateway-dev.in4bqk.ng.0001.usw2.cache.amazonaws.com:6379'
};

const client = redis.createClient();
// const key = 'limit.concurrency.3010000024';
const key = 'quota.daily.3010000024';

return client.llenAsync(key).then((count) => {
    console.log(count);
});

