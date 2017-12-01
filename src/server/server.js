import path from 'path';
import express from 'express';
import React from 'react';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
// let Hello = require('./src/client/hello');
import Hello from '../client/hello';

// import Hello from path.resolve(__dirname, '../client/hello');

function handleRender(req, res) {
    fs.readFile('./public/index.html', 'utf-8', function(err, data) {
        if (err) {
            console.log('----------------------');
        }
        let reactString = ReactDOMServer.renderToString(<Hello/>);
        // let reactString = "ReactDOMServer.renderToString(Hello)";
        console.log(reactString);
        // const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${reactString}</div>`);
        const document = data.replace(`<div id="app"></div>`, `<div id="app">${reactString}</div>`);
        res.send(document);
    });
}
const server = express();
server.use('/dist', express.static(path.join(__dirname, 'build')));
server.get("/", function(req, resp) {
    console.log(req.url);
    resp.send("hello the world");
});

server.get("/hello1", handleRender);
server.get("/hello", (req, resp) => {
    resp.send(`
    <!doctype html>
    <html lang="en">
      <head>...</head>
      <body>
        <div id="app">${ReactDOMServer.renderToString(<Hello/>)}</div>
        <script src="/dist/main.js"></script>
      </body>
    </html>
  `);    
});

server.get("*", function(req, resp) {
    resp.send("任意页面");
});

server.set('port', 3001);
server.listen(3001, () => {
    console.log(`server is running at http://localhost:${server.get('port')} in ${server.get('env')}\n`);
    console.log(`press CTRL-C to stop\n`);
});
