search_movie = async function(ctx, movie_name) {
	let response = await fetch(TORRENT_API_URL + '?query_term=' + encodeURIComponent(movie_name))
	let data = await response.json()
	return data.data.movies
}

start_download = async function(user, movie_name, link, byte_index, is_partial) {
	let proc
	if (!is_partial) {
		proc = child_process.spawn('./tools/transmission-remote.exe', [
			'-a',
			'-w',
			`${process.cwd()}\\db\\${user}\\${movie_name}\\`,
			link])
	} else {
		// -seq byte_index
		// -s ? -> start
	}
	// pr(proc)
	proc.stdout.on('data', (data) => {
		pr('STDOUT')
		pr(data.toString())
	})
	proc.stderr.on('data', (data) => {
		pr('STDERR')
		pr(data.toString())
	})

}