var toggled = false
$$('[data-page="main"]').on('click', '.toggle', function () {
	toggled = !toggled
	var text = (toggled) ? 'Done' : 'Edit'
 	$$('.toggle').text(text)
 	app.sortableToggle('.sortable')	
 	if (!toggled)
 		console.log('send to server')
})

var currentPlugin
$$('[data-page="main"]').on('click', 'li', function (e) {
	currentPlugin = e.target.id
	API.getPluginConfig(currentPlugin, function(err, config) {
		$$('iframe')[0].src = API.host+'/plugins/'+config.id+API.encodeConfig(config)
	})
})

$$('.views').on('click', '[data-page="add"] li', function (e) {
	app.router.load({url: 'main.html', reload: true})
	API.addPlugin(e.target.id, function(err) {
		console.log(err)
	})
})

function onToken(token) {
	if (!token)
	  	app.alert('Incorrect user/password', 'Login')
	else {
		localStorage.setItem('token', token)
		window.location.reload()
	}
}

$$('.views').on('submitted', '#loginForm, #signupForm', function (e) {
  	var data = JSON.parse(e.detail.data)
  	onToken(data.token)
})

window.addEventListener("message", function(e) {
	var plugin = JSON.parse(e.data)
	API.savePlugin(currentPlugin, plugin.attr)
	app.router.back()
}, false)