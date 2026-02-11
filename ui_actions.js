actions = {}

actions['/'] = function(res) {
	let page_content = read_file('www/homepage.html')
	res.respond(200, page_content)
}

actions['/login'] = function(res) {
	let page_content = read_file('www/login.html')
	res.respond(200, page_content)
}