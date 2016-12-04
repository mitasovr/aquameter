var request = require('request');

request('http://192.168.1.70', function (error, response, body) {
    if (error) {
        return;
    }
    var digest = JSON.parse(body);
    console.log(JSON.stringify({
        ts: +new Date(),
        digest: digest
    }, 0, 2));
})