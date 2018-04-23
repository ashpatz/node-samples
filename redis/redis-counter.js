const client = require('./redis-base').redisClient;

const key = 'limit.concurrency.3010000024.qa';
// const key = 'quota.daily.3010000024.qa';

//For BE11205048, BE11205049
// const key = 'quota.daily.3011205048.qa';

//For BE11205050
// const key = 'quota.daily.3011204756.qa';


/*client.existsAsync(key).then((exists) => {
    console.log(`key ${key} exists: ${exists}`);
    return client.pttlAsync(key)
}).then((ttl) => {
    console.log(`time to live ${ttl} milliseconds`);
    return new Date().getTime() + ttl;
}).then((expiryTime) => {
    console.log(`expiryTime : ${expiryTime}`);
    let date = new Date();
    let time = date.setTime(expiryTime);
    console.log(`expiry in UTC : ${date.toUTCString()}`);
    return client.getAsync(key);
}).then((count) => {
    console.log(`count before deletion: ${count}`);
    return client.delAsync(key);
}).then((removedCount) => {
    console.log(`removedCount : ${removedCount}`);
}).then(() => {
    process.exit(0);
});*/

client.existsAsync(key).then((exists) => {
    console.log(`key ${key} exists: ${exists}`);
    return client.pttlAsync(key)
}).then((ttl) => {
    console.log(`time to live ${ttl} milliseconds`);
    return new Date().getTime() + ttl;
}).then((expiryTime) => {
    console.log(`expiryTime : ${expiryTime}`);
    let date = new Date();
    let time = date.setTime(expiryTime);
    console.log(`expiry in UTC : ${date.toUTCString()}`);
    return client.getAsync(key);
}).then((count) => {
    console.log(`count: ${count}`);
}).then(() => {
    process.exit(0);
}).catch((err) => {
    console.log(err);
    process.exit(-1);
});

