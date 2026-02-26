let pr = console.error

let ws = new WebSocket('ws://localhost:8080')

ws.addEventListener('message', function(e) {
	pr(e.data[0], e.data[1])
})