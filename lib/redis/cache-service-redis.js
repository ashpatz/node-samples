const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = class RedisClient {

    constructor(options = {}) {
        this._redisUrl = 'redis://127.0.0.1:6379'
        if(options && options.redisUrl) {
            this._redisUrl = options.redisUrl;
        }
        this.initialize();
    }

    initialize() {
        const redisConnectionOptions = {
            url: this._redisUrl
        };
        this._redisClient = redis.createClient(redisConnectionOptions);
    }

    async put(key, value, ttl) {
        const expiryEpoch = Date.now() + ttl;
        const response = await this._redisClient.hset(key, 'value', value);
        await this._redisClient.hset(key, 'expiresAt', new Date(expiryEpoch).toISOString());
        await this._redisClient.pexpireat(key, expiryEpoch);
        return response;
    }

};
