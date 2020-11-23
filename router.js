'use strict';
const router = require('koa-joi-router');

let responseUtility = require('./utilities/common');
let validatorUtility = require('./utilities/validator');

const hello = require('./controllers/hello/index');

let responseObj = new responseUtility.ResponseUtility();
let validator = new validatorUtility.Validator(null, {allErrors: true, jsonPointers: true});
let validatorInstance = validator.getInstance();
require('ajv-errors')(validatorInstance, {singleError: true});

const helloController = new hello.HelloController(responseObj, validator, null);


const publicRouter = router();
let routes = [];

//Add Healthcheck endpoint
routes.push(
        {
            method: 'get',
            path: '/',
            handler: (ctx) => helloController.index(ctx),
        }
);


// publicRouter.prefix('/v1');
publicRouter.route(routes);

module.exports = publicRouter;


