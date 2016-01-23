var uuid = require("node-uuid")
var config = require("../config.js")
var error = require("./error_formater.js")

function create_handler (socket, posts_it) {
	
	var p = {
		id: uuid.v1(),
		locked: false,
		locker: "",
		title: "",
		desc: "",
		x: 0,
		y: 0
	}

	posts_it[posts_it.length] = p;

	socket.emit("new post_it", p)
	socket.broadcast.emit("new post_it", p)
}

module.exports = create_handler

