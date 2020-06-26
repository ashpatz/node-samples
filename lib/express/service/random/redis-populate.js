'use strict';

const hugeJson = require('.././huge_file.json');
const Promise = require('bluebird');
const CacheService = require('../../../redis/cache-service-redis');
const cacheService = new CacheService();

module.exports.populateRedis = (request, response) => {
    const results = [];
    const res = [];
    for (let i = 1; i <= 1; i++) {
        const ttl = 300 * 1000; //ms
        const expiryEpoch = Date.now() + ttl;
        let key = `test.91579D65B1C1235F9E4EB14FAB46CA4E778F778DCB6B74C81AB6AC128ACAF53F98A7EE9F2B7D7152B26EFF6063BF29ED.${i}`;
        results.push(cacheService.put(key, JSON.stringify(hugeJson), ttl));
        const responseItem = { key: key, expiresAt: new Date(expiryEpoch).toISOString()}
        res.push(responseItem);
    }
    Promise.all(results).then(() => {
        response
            .status(200)
            .json(res);
    });
};