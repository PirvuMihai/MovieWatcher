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