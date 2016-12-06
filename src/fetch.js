var logFile = process.argv[process.argv.length - 1];
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(logFile)
});

var logs = [];

lineReader.on('close', function (line) {
    fetch();
});
lineReader.on('line', function (line) {
    var parts = line.split(' ');
    logs.push({
        date: new Date(+parts[0]),
        digest: JSON.parse(parts[3].replace(/^'|'$/g, ''))
    });
});

function fetch() {
    console.log('first date', logs[0].date.toISOString());
    console.log('last date', logs[logs.length - 1].date.toISOString());
    var ctrs = [0, 0];
    var rq = 0;
    logs.map(log => {
        if (log.digest.rq <= rq) {
            console.log('WARNING: counters dropped, date', log.date.toISOString());
        }
        rq = log.digest.rq;
        log.digest.ctrs.map((times, ctrIndex) => {
            ctrs[ctrIndex] += times.length;
        });
    })
    ctrs.map((counter, index) => {
        console.log(index, counter / 100);
    })
}