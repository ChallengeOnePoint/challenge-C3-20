var config = require("../config.js")
var error = require("./error_formater.js")

function edit_handler (socket, posts_it, data, pseudo) {
	
	var p = {
		id: uuid.v1(),
		locked: false,
		locker: "",
		title: "",
		desc: "",
		x: 0,
		y: 0
	}

	for (var i = 0; i < posts_it.length; ++i)
	{
		if (posts_it[i].id == data.id)
		{
			if (data.title)
			{
				posts_it[i].title == data.title	
			}

			if (data.desc)
			{
				posts_it[i].desc == data.desc	
			}

			if (data.x)
			{
				posts_it[i].x == data.x	
			}

			if (data.y)
			{
				posts_it[i].x == data.y	
			}

			posts_it[i].locked = true
			posts_it[i].locker = pseudo

			break
		}
	}

	//socket.emit("update postit", posts_it[i])
	socket.broadcast.emit("update_postit", posts_it[i])
}

module.exports = edit_handler

