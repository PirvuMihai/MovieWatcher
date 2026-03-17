// ws.send([http_method, location, body])

let pr = console.error

let ws = new WebSocket('ws://localhost:8080')

ws.addEventListener('message', function(e) {
	let server_data = JSON.parse(e.data)
	if (server_data.type == 'alert')
		alert(server_data.msg)
	if (server_data.type == 'redirect')
		location.replace(server_data.msg)
})

post = function(body) {
	ws.send(JSON.stringify({method: 'POST', location: location.pathname, body: body}))
}