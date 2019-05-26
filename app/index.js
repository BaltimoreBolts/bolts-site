const express = require('express');
const fs = require('fs');

const server = express();

const PORT = 80;

// API routes
const apiRouter = require('./server')(express);
server.use('/api', apiRouter);

server.use('/assets', express.static('app/client/assets'));
server.use('/scripts', express.static('app/client/scripts'));
server.use('/pages', express.static('app/client/pages'));

server.get('/*', (req, res) => {
    const client = fs.readFileSync('app/client/index.html')
        .toString()
        .replace(/\$(GTAG)/g, process.env.GTAG);
    res.send(client);
});

server.listen(PORT, () => console.log('server listening on port', PORT));
