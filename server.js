var Hapi = require("hapi")
var config = require("./config.js")
var login_handler = require("./game/login.js")
var distance_handler = require("./game/distance.js")
var stop_handler = require("./game/stop.js")
var upgrade_handler = require("./game/upgrade.js")
var inputs_handler = require("./game/inputs.js")

var server = new Hapi.Server()
var users = []
var post_its = []

server.connection(config.ws_port)

var io = require("socket.io")(server.select("game").listener)

io.on("connection", function (socket) {

	socket.pseudo = null

	socket.on("login", login_handler.bind(null, socket, users, post_its))
	socket.on("distance2", distance_handler.bind(null, socket, users))
	socket.on("stop", stop_handler.bind(null, socket, users))
	socket.on("upgrade", upgrade_handler.bind(null, socket, players))
	socket.on("inputs", inputs_handler.bind(null, socket, players))

	socket.once("disconnect", function () {
		if (socket.pseudo) {
			//console.log("player " + socket.pseudo + " left the game")
			players[socket.pseudo] = null
			delete players[socket.pseudo]
		}
	})
})


server.start(function () {
	console.log("post it server runs!")
})


