const Ajv = require('ajv');
const _ = require('lodash');

class Validator {

    constructor(validator, args) {
        this.validator = validator || this._getDefaultValidator(args);
    }

    getInstance() {
        return this.validator;
    }

    _getDefaultValidator(args) {
        let ajv = new Ajv(args);
        return ajv;
    }

    validate(schema = {}, data = {}){
        try {
            let validate = this.validator.compile(schema);
            validate(data);
            return _.isEmpty(validate.errors) ? [] : validate.errors;
        } catch (err) {
            return [{"message": err.toString()}];
    }
    }
}

module.exports = {
    Validator
}
