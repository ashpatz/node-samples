'use strict';

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

// ################# ASYNC callbacks #################

console.log(' ASYNC CALLBACK');
const getSentenceFragmentAsync = (offset = 0, callback) => {
    const pageSize = 3;
    const sentence = [...'hello world'];
    setTimeout(() => callback({
        data: sentence.slice(offset, offset + pageSize),
        nextPage: offset + pageSize < sentence.length ? offset + pageSize : undefined
    }), 500); // same as setTimeout(callback, delay, callback args); see below commented code

    // setTimeout(callback, 500, ({
    //     data: sentence.slice(offset, offset + pageSize),
    //     nextPage: offset + pageSize < sentence.length ? offset + pageSize : undefined
    // }));
};

// getSentenceFragmentAsync(0, (data) => console.log(data)); //only collects partial data

//TODO IMPORTANT
// Original callback is called only once. Inside a recursion, the callback is what is defined/provided by its outer "parent"
const getSentenceAsync = (offset = 0, callback) => {
    getSentenceFragmentAsync(offset, (fragment) => {
        if (fragment.nextPage) {
            const newCallback = (nextFragment) => {
                return callback(fragment.data.concat(nextFragment)); //TODO not nextFragment.data
            };
            getSentenceAsync(fragment.nextPage, newCallback);
        } else {
            return callback(fragment.data);
        }
    })
};

getSentenceAsync(0, data => {
    console.log(data);
    console.log(' ASYNC CALLBACK ends');
});

// ################# ASYNC callbacks #################

// ################# ASYNC promise #################

console.log(' ASYNC PROMISES');

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

getSentenceFragmentPromise()
    .then((fragment) => console.log(fragment));

const getSentencePromise = (offset = 0) => {
    return getSentenceFragmentPromise(offset).then((fragment) => { //TODO IMPORTANT - return the promise
        if (fragment.nextPage) {
            return getSentencePromise(fragment.nextPage).then((nextFragment) => {
                return fragment.data.concat(nextFragment); //not nextFragment.data
            });
        } else {
            return fragment.data;
        }
    });
};

getSentencePromise().then((data) => {
    console.log(data);
    console.log(' ASYNC PROMISES end');
});

// ################# ASYNC promise #################