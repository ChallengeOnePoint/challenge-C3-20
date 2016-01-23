
function release_handler (socket, posts_it, id) {

		for (var post in posts_it)
				{
						if (post.id == id)
								{
										post.locked = false;
										post.locker = "";
										socket.broadcast.emit("release", id);
										socket.emit("release", id);
										return ;
								}
				}

}

module.exports = release_handler

