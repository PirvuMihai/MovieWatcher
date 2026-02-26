action = {}

action['/'] = function(res) {
	let page_content = read_file('www/homepage.html')
	res.respond(200, page_content)
}

action['/register'] = function(res) {
	if (res.req.method == 'GET') {
		let page_content = read_file('www/register.html')
		res.respond(200, page_content)			
	} else if (res.req.method == 'POST') {
		mkdir(`db/${res.post.username}`)
		res.redirect('/')
		res.respond(200, '')
	}
}

action['/login'] = function(res) {
	let page_content = read_file('www/login.html')
	res.respond(200, page_content)
}

action['404'] = function(res) {
	let page_content = ''
	res.respond(200, page_content)
}