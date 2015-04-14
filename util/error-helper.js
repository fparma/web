/**
 * Formats mongoose errors
 */

var util = require('util');

var messages = {
    'required': "%s is required.",
    'min': "%s below minimum.",
    'max': "%s above maximum.",
    'enum': "%s not an allowed value."
};

module.exports = function errorHelper(err) {
	var errors = [];

	Object.keys(err.errors).forEach(function(field) {
		var e = err.errors[field];

        if (messages[e.kind])
        	errors.push(util.format(messages[e.kind], e.path));
		else
			errors.push(e.message);
	});

	return errors;
};