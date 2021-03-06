const client = require('./cache-service-redis').redisClient;

//Required for console.table to work
const cTable = require('console.table');

client.keysAsync('*').then((keys) => {
    return Promise.all([
        Promise.resolve(keys),
        client.mgetAsync(keys),
        getTtls(keys)
    ]);
}).then(([keys, values, ttls]) => {
    return keys.map((key, i) => ({
        key: key, ttl: `${ttls[i]} ms`, expiryTime: `${new Date(Date.now()+ttls[i])}`, value: values[i]
    }));
}).then((data) => {
    console.table(data);
}).then(() => {
    process.exit(0);
}).catch((err) => {
    console.log(err);
    process.exit(-1);
});

const getTtls = (keys) => {
    let multi = client.multi();
    keys.forEach((key) => {
        multi.pttlAsync(key);
    });
    return multi.execAsync();
};
