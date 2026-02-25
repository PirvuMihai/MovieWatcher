// General config
path   = require('path')
fs     = require('fs')
crypto = require('crypto')

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

	let file_path = './www' + req.url
	let ext       = path.extname(file_path)

	if (ext) {
		fs.readFile(file_path, function(err, content) {
			if (!err) {
				let content_types = {
					'.css': 'text/css',
					'.js': 'text/javascript',
					'.png': 'image/png',
					'.jpg': 'image/jpeg',
					'.html': 'text/html'
				}

				res.writeHead(200, {
					'Content-Type': content_types[ext] || 'application/octet-stream'
				})
				res.end(content)
			} else {
				res.writeHead(404)
				res.end()
			}
		})
		return
	}

	res.respond = function(status_code, content) {
		res.writeHead(status_code, {'Content-Type': 'text/html'})
		res.end(content)
	}
	require('./ui_actions.js')
	res.req = req
	try {
		if (action[req.url])
			action[req.url](res)
		else
			action['404'](res)		
	} catch(e) {
		pr('error', e)
	}
})

server.listen(PORT, function() {
	console.log('Server running.')
})
