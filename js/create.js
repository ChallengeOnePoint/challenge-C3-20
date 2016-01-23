var uuid = require("node-uuid")
var config = require("../config.js")
var error = require("./error_formater.js")

function create_handler (socket, posts_it) {
	
	var p = {
		id: uuid.v1() + '',
		locked: false,
		locker: "",
		title: "new Post Tits!",
		desc: "A brand new Post Tits!",
		x: 0,
		y: 0
	}

	posts_it[posts_it.length] = p;

	socket.emit("new_postit", p)
	socket.broadcast.emit("new_postit", p)
}

module.exports = create_handler

