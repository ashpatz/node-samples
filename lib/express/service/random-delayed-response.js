'use strict';

const util = require('util');
const sleep = util.promisify(setTimeout);

module.exports.execute = (request, response) => {
    const randomDelay = getRandomInt(10) * 1000; // random delay of upto 10 seconds
    sleep(randomDelay).then( () => {
       response
           .status(200)
           .send(sampleResponse);
    });
};

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const sampleResponse = {
    glossary: {
        title: 'example glossary',
        GlossDiv: {
            title: 'S',
            GlossList: {
                GlossEntry: {
                    ID: 'SGML',
                    SortAs: 'SGML',
                    GlossTerm: 'Standard Generalized Markup Language',
                    Acronym: 'SGML',
                    Abbrev: 'ISO 8879:1986',
                    GlossDef: {
                        para: 'A meta-markup language, used to create markup languages such as DocBook.',
                        GlossSeeAlso: ['GML', 'XML']
                    },
                    GlossSee: 'markup'
                }
            }
        }
    }
};