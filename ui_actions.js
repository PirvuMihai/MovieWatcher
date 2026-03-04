ui_action = {}

ui_action['/'] = function(res) {
	let page_content = read_file('www/homepage.html')
	res.respond(200, page_content)
}

ui_action['/register'] = function(res) {
	let page_content = read_file('www/register.html')
	res.respond(200, page_content)			
}

ui_action['/login'] = function(res) {
	let page_content = read_file('www/login.html')
	res.respond(200, page_content)
}

ui_action['404'] = function(res) {
	let page_content = ''
	res.respond(200, page_content)
}