ui_action = {}

ui_action['/'] = function(res) {
	let content = `
<div class="center fill" id="homepage_container">
	<h1>Who's watching?</h1>
</div>
<div class="row center" style="flex: 3;">
	<p class="center" style="flex: 1;">Yo</p>
	<p class="center" style="flex: 1;">Yo</p>
	<p class="center" style="flex: 1;">Yo</p>
	<p class="center" style="flex: 1;">Yo</p>
</div>
<div class="center fill">
	<a class="button" href="/register">Add a new user</a>
</div>
	`
	res.respond(200, main_template({content: content}))
}

ui_action['/register'] = function(res) {
	let content = `
<div class="center fill column">
	<h1 style="margin-bottom: 2em;">What is your name?</h1>
	<input 
		type="text"
		id="username"
		required
		minlength="2"
		maxlength="32"
		pattern="[A-Za-z0-9]+"
		title="2-32 characters. Only numbers and letters are allowed."
		placeholder="Name: "
	/>
	<button class="button" onclick='send_form_data()' style="margin-top: 10em;">Create account</button>
</div>
<script>
	async function send_form_data() {
		post({username: username.value})
	}
</script>

	`
	res.respond(200, main_template({content: content}))			
}

ui_action['404'] = function(res) {
	let content = ''
	res.respond(200, main_template({content: content}))
}

ui_action['/watch_movie'] = function(res) {
	let content = `
<video id="player" controls autoplay>
  <source src="/get_movie_content" type="video/mp4">
</video>
	`
	res.respond(200, main_template({content: content}))			
}

ui_action['/get_movie_content'] = function(res) {
	let path
	while(1) {
		path = "C:\\Users\\Mihai\\movies\\db\\Vasile\\Kraven\\Kraven The Hunter (2024) [720p] [BluRay] [YTS.MX]\\Kraven.The.Hunter.2024.720p.BluRay.x264.AAC-[YTS.MX].mp4"
		if (!fs.statSync(path, {throwIfNoEntry: false}))
			path = "C:\\Users\\Mihai\\movies\\db\\Vasile\\Kraven\\Kraven The Hunter (2024) [720p] [BluRay] [YTS.MX]\\Kraven.The.Hunter.2024.720p.BluRay.x264.AAC-[YTS.MX].mp4.part"
		if (fs.statSync(path, {throwIfNoEntry: false}))
			break
	}
	let size = fs.statSync(path).size
	let range = res.req.headers.range
	
	if (!range) {
		res.writeHead(200, {
			"Content-Length": size,
			"Content-Type": "video/mp4",
		})
		fs.createReadStream(path).pipe(res)
		return
	}
	const parts = range.replace(/bytes=/, "").split("-")
	const start = parseInt(parts[0], 10)
	const end = parts[1] ? parseInt(parts[1], 10) : size - 1

	const chunkSize = (end - start) + 1

	res.writeHead(206, {
		"Content-Range": `bytes ${start}-${end}/${size}`,
		"Accept-Ranges": "bytes",
		"Content-Length": chunkSize,
		"Content-Type": "video/mp4",
	})

	fs.createReadStream(path, { start, end }).pipe(res)

}