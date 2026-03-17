socket_action = {}

socket_action['/register'] = async function(ctx) {
	if (ctx.method == 'POST') {
		mkdir(`db/${ctx.body.username}`)
		ctx.redirect('/movies')
	} else {
		throw new Error('WTF')
	}
}

socket_action['/search_movie'] = async function(ctx) {
	if (ctx.method == 'POST') {
		let a = []
		let movie_list = await search_movie(ctx, ctx.body.movie_name)
		for (let movie of movie_list) {
			if (movie.state != 'ok')
				continue
			let o = {
				title: movie.title,
				release_year: movie.year,
				summary: movie.summary,
				rating: movie.rating,
				duration: movie.runtime,
				image_link: movie.small_cover_image,
				torrents: [],
			}
			for (let torrent_info of movie.torrents) {
				o.torrents.push({
					url: torrent_info.url,
					quality: torrent_info.quality,
					seeders: torrent_info.seeds,
					size: torrent_info.size,
				})
			}
			a.push(o)
		}
		pr(a[0].torrents)
		return a
	}
}