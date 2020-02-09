'use strict';

// ################# SYNC #################

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

// ################# ASYNC #################

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

getSentenceFragmentAsync(0, (data) => console.log(data)); //only collects partial data

// IMPORTANT
// Original callback is called only once. Inside a recursion, the callback is what is defined/provided by its outer "parent"
//  1. concatenate
const getSentenceAsync = (offset = 0, callback) => {
  getSentenceFragmentAsync(offset, (fragment) => {
      if(fragment.nextPage) {
          getSentenceAsync(fragment.nextPage, (nextFragment) => {
             callback(fragment.data.concat(nextFragment));
          });
      } else {
          callback(fragment.data);
      }
  })
};

getSentenceAsync(0, data => {console.log(data)});

// ################# ASYNC #################