// General config
path        = require('path')
fs          = require('fs')
_crypto     = require('crypto')
querystring = require('querystring')
mustache    = require('mustache')
ws          = require('ws')

let SERVER_PORT = 8080

require('./utils.js')

if (file_exists('./config.js'))
	require('./config.js')

// Start the electron app
let { app: app, BrowserWindow: browser_window } = require('electron')

let window

function create_window() {
	window = new browser_window({
		width: 1200,
		height: 1200,
	})
	window.loadURL('http://localhost:' + SERVER_PORT)
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

let server = http.createServer(async function (req, res) {

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

	hot_require('./ui_actions.js')
	hot_require('./socket_actions.js')

	res.req = req

	try {
		if (ui_action[req.url])
			ui_action[req.url](res)
		else
			ui_action['404'](res)
	} catch(e) {
		pr('error', e)
	}
})

socket = new ws.Server({ server })

socket.active = {}

// Instead of POST in HTTP, all POST calls to the server will happen through the socket.
// Therefore, the client communicates through this pattern:
// ws.send({http_method, location, body})

socket.on('connection', function(ws) {

	let ctx = { ws: ws }

	send_data = function(ws, type, msg) {
		ws.send(JSON.stringify({type: type, msg: msg}))
	}

	ctx.alert = function(msg) {
		send_data(this.ws, 'alert', msg)
	}

	ctx.redirect = function(location) {
		send_data(this.ws, 'redirect', location)
	}

	ws.on('message', function(client_json) {
		let o = JSON.parse(client_json.toString())
		ctx.method = o.method
		ctx.body   = o.body
		if (socket_action[o.location])
			socket_action[o.location](ctx)
	})
})



server.listen(SERVER_PORT, function() {
	pr('Server running.')
})

// https://www.quora.com/Are-there-any-good-torrent-APIs-for-listing-torrents
// cauta comentariu de la assistant AI bot
// dau in API uri pana mi ies pe cur.
// NOTE: https://yts.bz/api/v2/list_movies.json?query_term=kraven