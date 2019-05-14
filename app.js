/** @type {Server} */
require('dotenv').config({path: `.env/${process.env.NODE_ENV}.env`});

const fs = require('fs');

let server;

if (process.env.NODE_ENV) {
    let index = fs.readFileSync('public/index.html');

    server = require('http').createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(index);
    });
} else {
    server = require('http').createServer();
}

require('./core/socket').initConsumers(server);

server.listen(process.env.APP_PORT, () => {
    console.log(`Running app in ${process.env.NODE_ENV} on port ${process.env.APP_PORT}`, );
});
