var Hapi = require("hapi")
var config = require("./config.js")
//var Path = require('path')
//
//var login_handler = require("./js/login.js")
//var distance_handler = require("./js/create.js")
//var stop_handler = require("./js/remove.js")
//var upgrade_handler = require("./js/move.js")
//var inputs_handler = require("./js/edit.js")
//var inputs_handler = require("./js/release.js")

var app = new Hapi.Server()

app.connection({ port: 4000, labels:['api'] })

var io = require("socket.io")(app.select('api').listener)

var users = []
var post_its = []

io.on("connection", function (socket) {

	socket.pseudo = null

//	socket.on("login", login_handler.bind(null, socket, users, post_its))
//	socket.on("distance2", distance_handler.bind(null, socket, users))
//	socket.on("stop", stop_handler.bind(null, socket, users))
//	socket.on("upgrade", upgrade_handler.bind(null, socket, players))
//	socket.on("inputs", inputs_handler.bind(null, socket, players))

	socket.once("disconnect", function () {
		if (socket.pseudo) {
			//console.log("player " + socket.pseudo + " left the game")
			users[socket.pseudo] = null
			delete users[socket.pseudo]
		}
	})
})


app.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

app.start(function () {
	console.log("post it server runs!")
})


