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
	setTimeout(hack, 1000)
})

function hack() {
	var config = pluginStore[currentPlugin]
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

$$('.views').on('click', '#timeLabel', function (e) {
  	$$('input[type="time"]').click()
})

$$('.views').on('input', '#time', function (e) {
	$$('#timeLabel').text($$('#time')[0].value)
	if (!$$('#enableAlarm')[0].checked) return
	API.enableAlarm($$('#time')[0].value.replace(':', ''))
})

window.addEventListener("message", function(e) {
	var plugin = JSON.parse(e.data)
	pluginStore[currentPlugin] = plugin
	API.savePlugins()
	mainView.router.back()
}, false)