search_movie = async function(ctx, movie_name) {
	let response = await fetch(TORRENT_API_URL + '?query_term=' + encodeURIComponent(movie_name))
	let data = await response.json()
	return data.data.movies
}

start_download = async function(user, movie_name, link) {
	let proc = child_process.spawn('./tools/aria2c.exe', [`--dir="./db/${user}/${movie_name}/"`, '--bt-sequential-download=true', '--seed-time=0', link])
	pr(proc)
	proc.stdout.on('data', (data) => {
		pr('STDOUT')
		pr(data.toString())
	})
	proc.stderr.on('data', (data) => {
		pr('STDERR')
		pr(data.toString())
	})

}