socket_action = {}

socket_action['register'] = function(ctx) {
	if (ctx.method == 'POST') {
		mkdir(`db/${res.post.username}`)
		ctx.redirect('/movies')
	} else {
		throw new Error('WTF')
	}
}