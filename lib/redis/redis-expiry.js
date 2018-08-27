const redisClient = require('./redis-base').redisClient;

// const key = 'limit.concurrency.3010000024';
const key = 'expirytest';

/*let currentDate = new Date();
const offsetToUTC = currentDate.getTimezoneOffset() * 60 * 1000; //ms
const expiry = (currentDate).setHours(23, 59, 59, 999); //midnight current timezone
const expiryUTC = expiry - offsetToUTC;*/

const expiry = new Date().setUTCHours(23, 59, 59, 999);

redisClient.delAsync(key).then((delCount) => {
    console.log(`delCount: ${delCount}`);
}).then(()=> {
    return redisClient.multi()
        .rpush(key, 1)
        .pexpireat(key, expiry)
        .execAsync();
}).then((result) => {
    console.log(`result: ${result}`);
    return redisClient.pttlAsync(key);
}).then((keyExpiry) => {
    console.log(`key expiry ${new Date().getTime() + keyExpiry}`);
    console.log(`var expiry: ${expiry}`);
    return redisClient.llenAsync(key);
}).then((count) => {
    console.log(`length: ${count}`);
});


