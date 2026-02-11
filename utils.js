let fs          = require('fs')
let crypto = require('crypto')
let path     = require('path')

pr = console.error

file_exists = function(path) {
	return fs.existsSync(path)
}

write_file = function(file, data) {
	return fs.writeFileSync(file, data)
}

read_file = function(path) {
	return fs.readFileSync(path)
}

mkdir = function(path) {
	if (!fs.existsSync(path))
		fs.mkdir(path, {recursive: true})
}
