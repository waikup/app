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

$$('[data-page="add"]').on('click', 'li', function (e) {
	app.router.load({url: 'main.html', reload: true})
	API.addPlugin(e.target.id, function(err) {
		console.log(err)
	})
})

$$('form#login').on('submitted', function (e) {
  	var xhr = e.detail.xhr // actual XHR object
 
  	var data = e.detail.data // Ajax repsonse from action file
  	// do something with response data
})

$$('form#signup').on('submitted', function (e) {
  	var xhr = e.detail.xhr // actual XHR object
 
  	var data = e.detail.data // Ajax repsonse from action file
  	// do something with response data
})

window.addEventListener("message", function(e) {
	var plugin = JSON.parse(e.data)
	API.savePlugin(currentPlugin, plugin.attr)
	app.router.back()
}, false)