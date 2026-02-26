pr    = console.error
parse = JSON.parse

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
		fs.mkdir(path, {recursive: true}, (e) => {
			if (e)
				pr(e)
		})
}

hot_require = function(path) {
	if (fs.existsSync(path))
		eval(read_file(path) + '')
}

random_hex = function() {
	return _crypto.randomBytes(64).toString('hex')
}