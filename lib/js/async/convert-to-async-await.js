'use strict';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ################# SYNC #################

console.log(' SYNC');

const getSentenceFragmentSync = (offset = 0) => {
    const pageSize = 3;
    const sentence = [...'hello world'];
    return {
        data: sentence.slice(offset, offset + pageSize),
        nextPage: offset +
        pageSize < sentence.length ? offset + pageSize : undefined
    }
};

const getSentenceSync = (offset = 0) => {
    const fragment = getSentenceFragmentSync(offset);
    if (fragment.nextPage) {
        return fragment.data.concat(getSentenceSync(fragment.nextPage));
    } else {
        return fragment.data;
    }
};

console.log(getSentenceSync());

// ################# SYNC #################

// ################# ASYNC AWAIT #################

console.log(' ASYNC AWAIT');

const getSentenceFragmentAsyncAwait = async function(offset = 0) {
    const pageSize = 3;
    const sentence = [...'hello world'];
    await wait(500);
    return {
        data: sentence.slice(offset, offset + pageSize),
        nextPage: offset +
        pageSize < sentence.length ? offset + pageSize : undefined
    }
};

//TODO Important - Async await can be used as an alternative of promises, not of callbacks
// The below function can also be "awaited"
const getSentenceFragmentPromise = (offset = 0) => {
    const pageSize = 3;
    const sentence = [...'hello world'];
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve({ // instead of a callback, you invoke the resolve function
            data: sentence.slice(offset, offset + pageSize),
            nextPage: offset + pageSize < sentence.length ? offset + pageSize : undefined
        }), 500);
    });
    return promise;
};

const getSentenceAsyncAwait = async function(offset = 0) {
    const fragment = await getSentenceFragmentAsyncAwait(offset);
    // const fragment = await getSentenceFragmentPromise(offset);
    if (fragment.nextPage) {
        return fragment.data.concat(await getSentenceAsyncAwait(fragment.nextPage));
    } else {
        return fragment.data;
    }
};

getSentenceAsyncAwait().then(data => console.log(data));

// ################# ASYNC AWAIT #################