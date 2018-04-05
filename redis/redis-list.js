const client = require('./redis-base').redisClient;

// const key = 'limit.concurrency.3010000024';
const key = 'quota.daily.3010000024';

client.llenAsync(key).then((count) => {
    console.log(`count before deletion: ${count}`);
    return client.delAsync(key);
}).then((removedCount) => {
    console.log(`removedCount : ${removedCount}`);
    return client.existsAsync(key);
}).then((exists) => {
    console.log(`exists: ${exists}`);
    return client.pttlAsync(key)
}).then((ttl) => {
    console.log(`time to live ${ttl} milliseconds`);
    return new Date().getTime() + ttl;
}).then((expiryTime) => {
    console.log(`expiryTime : ${expiryTime}`);
    let date = new Date();
    let time = date.setTime(expiryTime);
    console.log(`expiry in UTC : ${date.toUTCString()}`)
});

/*client.existsAsync(key).then((exists) => {
    console.log(`exists: ${exists}`);
    return client.pttlAsync(key)
}).then((ttl) => {
    console.log(`time to live ${ttl} milliseconds`);
    return new Date().getTime() + ttl;
}).then((expiryTime) => {
    console.log(`expiryTime : ${expiryTime}`);
    let date = new Date();
    let time = date.setTime(expiryTime);
    console.log(`expiry in UTC : ${date.toUTCString()}`);
    return client.llenAsync(key);
}).then((count) => {
    console.log(`count: ${count}`);
});*/

