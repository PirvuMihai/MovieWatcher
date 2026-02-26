// General config
path        = require('path')
fs          = require('fs')
_crypto     = require('crypto')
querystring = require('querystring')
mustache    = require('mustache')
ws          = require('ws')

let SERVER_PORT = 8080
let SOCKET_PORT = 5555

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

function alert(msg) {
	this.setHeader('x-alert', msg)
}

function redirect(url) {
	this.writeHead(302, {'Location': url})
	this.end()
}

// Post body is sent on chunks, so append them

async function parse_request_chunks(res) {
	let is_form = res.req.headers['content-type'] == 'application/x-www-form-urlencoded'
	let is_json = res.req.headers['content-type'] == 'application/json'
	if (is_form || is_json) {
		let chunks = []
		for await (let chunk of res.req)
			chunks.push(chunk)
		res.req.body = Buffer.concat(chunks).toString()
		if (is_form)
			res.post = querystring.parse(res.req.body)
		else if (is_json) {
			try {
				res.post = JSON.parse(res.req.body)
			} catch (e) {
				res.alert('JSON invalid')
			}
		}
	}
}

let http = require('http')

let server = http.createServer(async function (req, res) {

	let file_path = './www' + req.url
	let ext       = path.extname(file_path)

	socket.on('connection', function(ws) {
		pr('Connection established.')
		let session_id = random_hex()
		socket.active[session_id] = ''
		ws.send(['session', session_id])
	})

	socket.on('close', function(ws) {
		delete socket.active[ws.session_id]
	})

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

	let session_id = random_hex()

	res.req      = req
	res.alert    = alert
	res.redirect = redirect

	await parse_request_chunks(res)

	try {
		if (action[req.url])
			action[req.url](res)
		else
			action['404'](res)		
	} catch(e) {
		pr('error', e)
	}
})

let socket = new ws.Server({ server })

socket.active = {}

server.listen(SERVER_PORT, function() {
	console.log('Server running.')
})
