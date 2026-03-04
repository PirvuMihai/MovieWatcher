// ws.send([http_method, location, body])

let pr = console.error

let ws = new WebSocket('ws://localhost:8080')

ws.addEventListener('message', function(e) {
	if (e[0] == 'alert')
		alert(e[1])
	if (e[0] == 'redirect')
		replace(e[1])
})

post = function(body) {
	ws.send(['POST', location.href, body])
}