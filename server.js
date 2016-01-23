var Hapi = require("hapi")
var config = require("./config.js")
var Inert = require('inert');

var login_handler = require("./js/login.js")
var create_handler = require("./js/create.js")
var release_handler = require("./js/release.js")
var edit_handler = require("./js/edit.js")
//var stop_handler = require("./js/remove.js")
//var upgrade_handler = require("./js/move.js")
//var inputs_handler = require("./js/edit.js")
//var inputs_handler = require("./js/release.js")

var app = new Hapi.Server()

app.connection({ port: 4000, labels:['api'] })

var io = require("socket.io")(app.select('api').listener)

var users = []
var posts_it = []

app.register(Inert, () => {});

io.on("connection", function (socket) {

		socket.pseudo = null

		socket.on("login", login_handler.bind(null, socket, users, posts_it))
		socket.on("create", create_handler.bind(null, socket, posts_it))
		socket.on("edit", edit_handler.bind(null, socket, posts_it))
		socket.on("release", release_handler.bind(null, socket, posts_it))

		socket.once("disconnect", function () {
				if (socket.pseudo) {
						//console.log("user " + socket.pseudo + " left the server")
						for (var i = 0; i < users.length; ++i)
						{
							if (users[i].pseudo == socket.pseudo)
							{
								users.splice(i, 1)
								return
							}
						}
				}
		})
})

app.route({
		method: 'GET',
		path: '/{path*}',
		handler: function (request, reply) {
				const path = request.params.path ? request.params.path : 'public/index.html';
				reply.file(path);

		}
});

app.start(function () {
		console.log("post it server runs!")
})


