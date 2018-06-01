'use strict';

const consoleLog = require('../logger/logger').consoleLog;
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'https://search-logging-loggin-3ha8cv2vsn79-hv4wisu7bcsvisjdzgj2mc43dy.us-east-1.es.amazonaws.com',
    log: 'info'
});

module.exports.query = (queryString) => {
    return client.search({
        index: 'platform_audit*',
        q : `\"${queryString}\"`
    }).then((data) => {
        // console.log(data);
        consoleLog(JSON.stringify(data.hits));
        if(data.hits.hits.length > 0) {
            consoleLog(JSON.stringify(data.hits.hits));
            return data.hits.hits;
        } else {
            return null;
        }
    }).catch( (err) => {
        consoleLog(err);
        return false;
    });
};


// q: '\"dummy test audit service : us-east-1 :  2018-05-30T17:53:02.606Z\"'

/*query: {
    match_phrase : {
        about: 'dummy test audit service : us-east-1 :  2018-05-30T17:53:02.606Z'
    }
}*/
/*    query_string: {
        query: 'dummy test audit service : us-east-1 :  2018-05-30T17:53:02.606Z',
        analyze_wildcard: true
    }
}
type: 'kinesis',
body: {
    query: {
        match: {
            body: 'dummy test audit service : us-east-1 :  2018-05-30T17:53:02.606Z'
        }
    }
}*/

