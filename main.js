// General config
let PORT = 8080

require('./utils.js')

if (file_exists('./config.js'))
	require('./config.js')

// Start the electron app
let { app: app, BrowserWindow: browser_window } = require('electron')

let window

function create_window() {
	window = new browser_window({
		width: 800,
		height: 600,
	})
	window.loadURL('http://localhost:' + PORT)
	window.webContents.openDevTools()
}

app.whenReady().then(() => {
	create_window()
})

app.on('window-all-closed', function() {
	app.quit()
})

// Start the http server
let http = require('http')

let server = http.createServer(function (req, res) {
	res.respond = function(status_code, content) {
		res.writeHead(status_code, {'Content-Type': 'text/html'})
		res.end(content)
	}
	require('./ui_actions.js')
	res.req = req
	if (actions[req.url])
		actions[req.url](res)
	else 
		pr('No such thing')
})

server.listen(PORT, function() {
	console.log('Server running.')
})
