const _ = require('lodash');

const HttpError = require("../errors/error-types").HttpError;
const AccessDeniedException = require("../errors/error-types").AccessDeniedException;
const AuthFailedException = require("../errors/error-types").AuthFailedException;
const NotFoundException = require("../errors/error-types").NotFoundException;
const EmptyValueException = require("../errors/error-types").EmptyValueException;
const InvalidValueException = require("../errors/error-types").InvalidValueException;
const DataNotSaved = require("../errors/error-types").DataNotSaved;
const InvalidInputException = require("../errors/error-types").InvalidInputException;
const DuplicateValueException = require("../errors/error-types").DuplicateValueException;
const InvalidStateException = require("../errors/error-types").InvalidStateException;

let KNOWN_ERRORS = [
    "HttpError", "AccessDeniedException", "AuthFailedException", "NotFoundException",
    "EmptyValueException", "InvalidValueException", "DataNotSaved", "InvalidInputException",
    "DuplicateValueException", "InvalidStateException"];

class ServerUtility {
    normalizePort(val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }
}

class ResponseUtility {

    constructor() {
        this.responseObj = this.getResponseObj()
    }

    getResponseObj() {
        return {
            "status": "error",
            "data": {},
            "meta": {}
        }
    }

    processClientError(error = []) {
        let errorMessage = _.map(error, function (item) {
            return {
                "type": item["keyword"],
                "param": item["params"],
                "message": item["message"]
            }
        });
        this.responseObj["meta"] = {
            "message": errorMessage
        }
        return this.responseObj;
    }
    processSuccessResponse(status, data = {}, meta = {}) {
        this.responseObj["meta"] = meta;
        this.responseObj["status"] = status;
        this.responseObj["data"] = data;
        return this.responseObj;
    }

    processServerError(error) {
        this.responseObj["meta"] = error;
        return this.responseObj;
    }

    handleError(ctx, error = Object) {
        console.log(error);
        const applicationContextErrors = KNOWN_ERRORS;
        try {
            if (_.indexOf(applicationContextErrors, error.name)) {
                return ctx.send(error.status, error.message);
            } else {
                ctx.status = 500;
                ctx.body = {}
                return ctx;
            }
        } catch (err) {
            ctx.status = 500;
            ctx.body = {}
            return ctx;
    }
    }

}
module.exports = {
    ServerUtility: ServerUtility,
    ResponseUtility: ResponseUtility
};