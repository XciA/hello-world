'use strict';

class HelloController {
    
    constructor(responseUtility = {}, validator = Object, schema = {}) {
        this.responseUtility = responseUtility;
        this.responseObj = responseUtility.getResponseObj();
        this.validator = validator;
        this.schema = schema;
    }
    async index(ctx) {
        ctx.ok("Hello World");
    }
}
module.exports = {
    HelloController
};