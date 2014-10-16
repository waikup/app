var toggled = false
$$('[data-page="main"]').on('click', '.toggle', function () {
	toggled = !toggled
	var text = (toggled) ? 'Done' : 'Edit'
 	$$('.toggle').text(text)
 	app.sortableToggle('.sortable')	
 	if (!toggled) {
 		console.log('holahola')
 		$$('.sortable li').each(function(i, el) {
 			console.log(el)
 		})
 		API.savePlugins()
 	}
})

var currentPlugin
$$('[data-page="main"]').on('click', '.sortable li', function (e) {
	currentPlugin = e.target.id
})

function hack() {
	var config = pluginStore[currentPlugin]
	config.token = localStorage.getItem('token')
	var url = API.host+'/api/plugin/'+currentPlugin+'/config/index.html'+API.encodeConfig(config)
	console.log(url)
	$$('iframe')[0].src = url
}

$$('.views').on('click', '.delete', function () {
	delete pluginStore[currentPlugin]
	API.savePlugins(function() {
		window.location.reload()
	})
})

$$('.views').on('click', '[data-page="add"] li', function (e) {
	pluginStore[e.target.id] = {}
	API.savePlugins(function() {
		window.location.reload()
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

$$('.views').on('click', '#loginForm a', function (e) {
  	$$('#loginForm input[type="submit"]').click()
})

$$('.views').on('click', '#signupForm a', function (e) {
  	$$('#signupForm input[type="submit"]').click()
})

$$('.views').on('change', '#enableAlarm', function (e) {
	if ($$('#enableAlarm')[0].checked)
	  	API.enableAlarm($$('#time')[0].value.replace(':', ''))
	else
		API.disableAlarm()
})

$$('.views').on('keypress', '#time', function (e) {
	if (e.keyCode == 13) {
		if (!$$('#enableAlarm')[0].checked) return
	  	API.enableAlarm($$('#time')[0].value.replace(':', ''))
	}
})

window.addEventListener("message", function(e) {
	console.log('holi')
	/*var plugin = JSON.parse(e.data)
	pluginStore[currentPlugin] = plugin.attr
	API.savePlugins()*/
	mainView.router.back()
}, false)