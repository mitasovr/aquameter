var request = require('request');

request('http://192.168.1.70/reset', function (error, response, body) {
    if (error) {
        return;
    }
    var digest = JSON.parse(body);
    if (digest.ctrs[0].length === 0 && digest.ctrs[1].length === 0) {
        return;
    }
    console.log(+new Date(), body);
})
