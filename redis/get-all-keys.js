const client = require('./redis-base').redisClient;

client.keysAsync('*').then((keys) => {
    return client.mgetAsync(keys).then((values) => {
        const data = {};
        //merge key and value arrays
        for (let i = 0; i < keys.length; i++) {
            data[keys[i]] = values[i];
        }
        return data;
    });

}).then((data) => {
    // console.log(JSON.stringify(data));
    console.log(data);
}).then(() => {
    process.exit(0);
}).catch((err) => {
    console.log(err);
    process.exit(-1);
});
