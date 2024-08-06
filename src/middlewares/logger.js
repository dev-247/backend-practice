const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'log.txt');

const logMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const headers = JSON.stringify(req.headers);
    const body = req.body ? JSON.stringify(req.body) : '';
    const remoteAddress = req.ip;
    const startTime = Date.now();

    res.on('finish', () => {
        const statusCode = res.statusCode;
        const responseTime = Date.now() - startTime;
        const logEntry = `${timestamp} ${method} ${url}\nheader:${headers}\nbody:${body}\nstatus:${statusCode} -time :${responseTime}ms\n===========reqEND==============\n`;

        fs.appendFile(logFile, logEntry, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    });

    next();
};

module.exports = logMiddleware;