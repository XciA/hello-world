const cors = require('@koa/cors');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const respond = require('koa-respond');
const path = require('path');
const serve   = require('koa-static');

const config = require('./config');
const router = require('./router');
const logger = require('./config/log');
const render = require('koa-ejs');


const commonUtilty = require('./utilities/common');
let responseUtility = require('./utilities/common');
let responseObj = new responseUtility.ResponseUtility();

let serverUtilty = new commonUtilty.ServerUtility();

class App extends Koa {

    constructor(config = {}, port) {
        super();
        this.env = config.env;
        this.applicationDefaultPort = port ? port : config.port;
        this._initMiddlewares();
        this._initRoutes();
        this.servers = [];
    }

    _initMiddlewares() {
        this.use(serve('.'));
        this.use(serve(__dirname + '/assets'));
        this.use(
                bodyParser({
                    enableTypes: ['json', 'form'],
                    formLimit: '10mb',
                    jsonLimit: '10mb'
                })
                );
        this.use(
                cors({
                    origin: function (origin, callback) {
                          return "*";
                      },
                    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
                    allowHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Headers','Origin','X-Requested-With', 'Content-Type', 'Accept', 'auth-bearer', 'auth-id'],
                    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
                    credentials: true
                })
                );
        this.use(respond());
        this.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                return responseObj.handleError(ctx, err);
            }
        })
    }

    _initRoutes() {
        // Bootstrap application router
        this.use(router.middleware());
    }

    _initServer(...params) {
        const server = super.listen(...params);
        this.servers.push(server);
        return server;
    }

    _closeServer() {
        for (const server of this.servers) {
            server.close();
        }
    }
}
function handleError(err, ctx) {

    if (ctx == null) {
        console.log({err, event: 'error'}, 'Unhandled exception occured');
    }
}

async function terminate(signal) {
    try {
        await app.terminate();
    } finally {
        console.log({signal, event: 'terminate'}, 'App is terminated');
        process.kill(process.pid, signal);
    }
}

const applicationPort = serverUtilty.normalizePort(config.port);
const app = new App(config, applicationPort);

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: true
});

const server = app._initServer(applicationPort, config.host, () => {
    console.log(`API server listening on ${config.host}:${applicationPort}, in ${config.env}`);
});

server.on('error', handleError);
const errors = ['unhandledRejection', 'uncaughtException'];
errors.map(error => {
    process.on(error, handleError);
});

const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
signals.map(signal => {
    process.once(signal, () => terminate(signal));
});

module.exports = {
    App
}