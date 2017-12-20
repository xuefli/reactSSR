import * as Express from 'express';
// import * as React from 'react';
import render from './routes';
import * as path from 'path';


const publicPath = path.join(__dirname, 'dist/client');
const server = Express();
const port = 3000;
server.use('/static', Express.static('dist/client'));
server.use(Express.static('dist/client'));
server.use('/', render);
server.listen(port, () => {
    console.log(`__dirname=${__dirname}`);
    console.log(`publicPath=${publicPath}`);
    console.log(`server listen on port:${port}`);
});

