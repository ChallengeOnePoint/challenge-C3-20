
function release_handler (socket, posts_it, id) {

		for (var post in posts_it)
				{
						if (post.id == id)
								{
										if (!post.locked)
												{
														var index = posts_it.indexOf(post);
														posts_it.slice(index, 1);
														socket.broadcast.emit("remove", id);
														socket.emit("remove", id);
												}
												return ;
								}
				}

}

module.exports = release_handler

