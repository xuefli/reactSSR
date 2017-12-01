import path from 'path';
// import webpack from 'webpack';
// import webpackMiddleware from 'webpack-dev-middleware';
import express, { Express } from 'express';
// import config from '../../webpack.config.js';

const server: Express = express();
// const compiler = webpack(config);


const DIST_DIR = path.join(__dirname, 'dist');
server.use(express.static(DIST_DIR));
// server.use(webpackMiddleware(compiler));
server.get("/", function(req, resp) {
    console.log(req.url);
    resp.send("hello the world");
})

server.listen(3001, () => {
    console.log(`server is running at http://localhost:${server.get('port')} in ${server.get('env')}\n`);
    console.log(`press CTRL-C to stop\n`);
})
