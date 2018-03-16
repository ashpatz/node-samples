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

return client.existsAsync('somekey').then((exists) => {
    console.log(`exists ${exists}`);
    if(exists) {
        return client.getAsync('somekey');
    } else {
        console.log(`setting key`);
        return client.psetexAsync('somekey', 30000, 'somevalue').then((response) => {
            console.log(`set response ${response}`);
            return client.getAsync('somekey');
        });
    }
}).then((response) => {
    console.log(`getAsync response ${response}`);
    return client.pttlAsync('somekey');
}).then((expiry) => {
    console.log(`expiry ${expiry}`);
});

