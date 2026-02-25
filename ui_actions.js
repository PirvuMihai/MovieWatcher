action = {}

action['/'] = function(res) {
	let page_content = read_file('www/homepage.html')
	res.respond(200, page_content)
}

action['/login'] = function(res) {
	let page_content = read_file('www/login.html')
	res.respond(200, page_content)
}

action['404'] = function(res) {
	let page_content = ''
	res.respond(200, page_content)
}