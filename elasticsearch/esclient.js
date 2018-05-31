var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'https://search-logging-loggin-3ha8cv2vsn79-hv4wisu7bcsvisjdzgj2mc43dy.us-east-1.es.amazonaws.com',
    log: 'info'
});

client.search({
    index: 'platform_audit*',

    q: '\"dummy test audit service : us-east-1 :  2018-05-30T17:53:02.606Z\"'

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
}).then((data) => {
    // console.log(data);
    console.log(data.hits.total);
    console.log(data.hits.hits);
});