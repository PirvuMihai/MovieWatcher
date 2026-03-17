socket_action = {}

socket_action['/register'] = function(ctx) {
	if (ctx.method == 'POST') {
		mkdir(`db/${ctx.body.username}`)
		ctx.redirect('/movies')
	} else {
		throw new Error('WTF')
	}
}