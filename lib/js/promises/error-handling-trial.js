'use strict';

const Promise = require('bluebird');

new Promise((resolve, reject) => {
    throw new Error('error')
}).then(console.log);
    // .catch(console.error);


process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection caught!');
    // console.error(err);
});

Promise.resolve(1)
    .then((x) => x + 1) //implicit return
    .then((x) => {
        console.log(`x: ${x}`);
        throw new Error('My Error');
    })
    .catch(() => 1)
    .then((x) => x + 1)
    .then((x) => console.log(x))
    .catch(console.error);