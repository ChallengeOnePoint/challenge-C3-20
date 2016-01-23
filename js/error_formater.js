var util = require("util")

function error_formater (request_name, error_value, description) {

	return {
		request_name: '' + request_name,
		error_value: util.inspect(error_value),
		description: '' + description
	}
}

module.exports = error_formater

