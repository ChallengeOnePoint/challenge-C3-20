var config = require("../config.js")
var error = require("./error_formater.js")

function login_handler (socket, users, posts_it, pseudo) {
	
	pseudo = pseudo.toString().trim()

	if (pseudo.length < config.pseudo_min_length) {
		socket.emit("err", error("login", pseudo, "pseudo too short"))
		return
	}

	if (pseudo.length > config.pseudo_max_length) {
		socket.emit("err", error("login", pseudo, "pseudo too long"))
		return
	}

	if (users[pseudo]) {
		socket.emit("err", error("login", pseudo, "pseudo already used"))
		return
	}

	if (socket.pseudo) {
		socket.emit("err", error("login", pseudo, "user already logged"))
		return
	}

	users[users.length] = {
		pseudo: pseudo
	}

	socket.pseudo = pseudo

	socket.emit("postits", posts_it)
}

module.exports = login_handler

